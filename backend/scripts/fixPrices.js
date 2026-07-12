/**
 * One-time script: rounds every stored vehicle/purchase price to a whole rupee.
 * Fixes float drift (e.g. 249999.99999999994 → 250000).
 *
 * Usage: node scripts/fixPrices.js
 */
import dotenv from "dotenv";
import mongoose from "mongoose";

import Vehicle from "../models/Vehicle.js";
import Purchase from "../models/Purchase.js";

dotenv.config();

const roundPrices = async (Model, label) => {
    const docs = await Model.find({}, "_id price").lean();
    let updated = 0;

    for (const doc of docs) {
        const rounded = Math.round(Number(doc.price));

        if (rounded !== doc.price) {
            await Model.updateOne({ _id: doc._id }, { $set: { price: rounded } });
            updated += 1;
            console.log(`${label} ${doc._id}: ${doc.price} → ${rounded}`);
        }
    }

    console.log(`${label}: ${updated} record(s) updated`);
};

await mongoose.connect(process.env.MONGODB_URL);
await roundPrices(Vehicle, "Vehicle");
await roundPrices(Purchase, "Purchase");
await mongoose.connection.close();

console.log("Done.");
