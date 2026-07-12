/**
 * Normalises user/API price input to a whole rupee integer.
 * Keeps the value deterministic even when the browser exposes floating-point
 * numbers from number inputs or arrow-key changes.
 */
export const parsePriceInput = (value) => {
    if (value === "" || value === null || value === undefined) {
        return "";
    }

    const cleaned = String(value).trim().replace(/[^0-9.-]/g, "");
    if (cleaned === "" || cleaned === "." || cleaned === "-") return "";

    const num = Number(cleaned);
    if (!Number.isFinite(num)) return "";

    return Math.round(num);
};

/**
 * Formats a price for INR display without floating-point artefacts.
 */
export const formatINR = (price) => {
    // Coerce safely to integer rupees. Strip any non-digit characters first.
    const cleaned = String(price ?? "").replace(/[^0-9-]/g, "");
    const amount = parseInt(cleaned, 10);
    return (Number.isNaN(amount) ? 0 : amount).toLocaleString("en-IN");
};
