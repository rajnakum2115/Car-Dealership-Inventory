import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        brand: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true,
            // Store whole rupees only — avoids float drift like 250000 → 249998.
            set: (value) => Math.round(Number(value))
        },

        image: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        quantity: {
            type: Number,
            default: 1
        },

        fuel: {
            type: String,
            default: ""
        },

        transmission: {
            type: String,
            default: ""
        },

        year: {
            type: Number,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Vehicle", vehicleSchema);
