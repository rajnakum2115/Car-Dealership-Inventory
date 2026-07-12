/**
 * Parses a price value into a whole-number rupee amount.
 * Strips commas/currency symbols and rounds to avoid float drift (e.g. 249999.99999999994 → 250000).
 */
const parsePrice = (value) => {
    if (value === undefined || value === null || value === "") {
        return undefined;
    }

    const cleaned = String(value).trim().replace(/[₹,\s]/g, "");

    if (cleaned === "") {
        return undefined;
    }

    // Parse as float to accept decimal input, then round to whole rupees.
    const num = parseFloat(cleaned);

    if (Number.isNaN(num)) {
        throw new Error("Invalid price");
    }

    return Math.round(num);
};

export default parsePrice;
