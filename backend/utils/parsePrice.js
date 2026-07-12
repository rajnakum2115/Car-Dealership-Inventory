/**
 * Parses a price value into a whole-number rupee amount.
 * Strips commas/currency symbols and rounds to avoid float drift
 * that can appear when browsers emit floating-point values from number inputs.
 */
const parsePrice = (value) => {
    if (value === undefined || value === null || value === "") {
        return undefined;
    }

    const cleaned = String(value).trim().replace(/[^0-9.-]/g, "");

    if (cleaned === "" || cleaned === "." || cleaned === "-") {
        return undefined;
    }

    const num = Number(cleaned);

    if (!Number.isFinite(num)) {
        throw new Error("Invalid price");
    }

    const rounded = Math.round(num);
    console.log("[Vehicle Price] parsePrice", {
        input: value,
        cleaned,
        numericValue: num,
        roundedValue: rounded
    });

    return rounded;
};

export default parsePrice;
