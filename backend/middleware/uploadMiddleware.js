import multer from "multer";

// Store the file in memory as a Buffer so we can either stream it to
// Cloudinary or write it to disk depending on the configured provider.
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB max
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    }
});

export default upload;
