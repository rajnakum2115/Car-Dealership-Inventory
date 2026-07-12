import CloudinaryPkg from "cloudinary";

// `cloudinary` ships a CommonJS module whose default export carries v2.
// Importing it this way is robust under both Node ESM and Jest's ESM loader.
const cloudinary = CloudinaryPkg.v2 || CloudinaryPkg.default?.v2 || CloudinaryPkg;

// Cloudinary is only configured when all three credentials are present in
// the environment. When they are missing, image uploads fall back to local
// disk storage (see utils/handleImageUpload.js), so the app works out of the
// box and becomes "Cloudinary-enabled" the moment you add the env vars.
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export const isCloudinaryConfigured = Boolean(
    cloudName && apiKey && apiSecret
);

if (isCloudinaryConfigured) {
    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret
    });
}

export default cloudinary;
