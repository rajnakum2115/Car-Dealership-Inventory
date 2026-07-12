/**
 * Resolves a vehicle's image value to a usable <img src>.
 *
 * Image values can come from three sources, all handled here:
 *  1. Full URL from Cloudinary (https://...)            -> use as-is
 *  2. Locally uploaded path from the backend (/uploads/...) -> prefix with backend origin
 *  3. Legacy bare filename (e.g. "toyota.jpg") served   -> prefix with /images/
 *
 * The backend origin is derived from the axios baseURL so uploads work in
 * both dev and production without code changes.
 */
const BACKEND_ORIGIN = "http://localhost:8000";

const getImageSrc = (image) => {
    if (!image) {
        return "/images/placeholder.jpg";
    }

    if (image.startsWith("http://") || image.startsWith("https://")) {
        return image;
    }

    if (image.startsWith("/uploads/")) {
        return `${BACKEND_ORIGIN}${image}`;
    }

    if (image.startsWith("/")) {
        return image;
    }

    // Legacy bare filename.
    return `/images/${image}`;
};

export default getImageSrc;
