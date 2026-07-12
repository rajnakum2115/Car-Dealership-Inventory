/**
 * Normalises user/API price input to a whole rupee integer.
 */
export const parsePriceInput = (value) => {
    if (value === "" || value === null || value === undefined) {
        return "";
    }

    const cleaned = String(value).trim().replace(/[₹,\s]/g, "");
    if (cleaned === "") return "";

    // Use parseFloat to accept decimal input but store/display whole rupees.
    const num = parseFloat(cleaned);
    if (Number.isNaN(num)) return "";

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
