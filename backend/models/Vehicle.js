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
            required: true
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
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Vehicle", vehicleSchema);