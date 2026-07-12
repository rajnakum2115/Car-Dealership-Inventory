import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import cloudinary, { isCloudinaryConfigured } from "../config/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "..", "uploads");

/**
 * Processes an uploaded image (a multer file in memory storage).
 *
 * - If Cloudinary is configured, the buffer is uploaded to Cloudinary and the
 *   resulting secure URL is returned.
 * - Otherwise the buffer is written to backend/uploads and the served path
 *   "/uploads/<filename>" is returned (app.js serves this folder statically).
 * - When no file was provided (req.file is undefined), returns null so the
 *   caller can fall back to an existing image value.
 */
const handleImageUpload = async (file) => {
    if (!file) {
        return null;
    }

    if (isCloudinaryConfigured) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "car-dealership",
                    resource_type: "image"
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result.secure_url);
                    }
                }
            );

            uploadStream.end(file.buffer);
        });
    }

    // Local fallback — make sure the uploads folder exists.
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    const filePath = path.join(uploadsDir, uniqueName);

    fs.writeFileSync(filePath, file.buffer);

    return `/uploads/${uniqueName}`;
};

export default handleImageUpload;
