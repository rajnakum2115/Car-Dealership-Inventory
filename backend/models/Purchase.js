import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true
        },

        // Snapshot of the vehicle at the time of purchase so order history
        // stays intact even if the vehicle is later edited or deleted.
        vehicleSnapshot: {
            name: { type: String, required: true },
            brand: { type: String, default: "" },
            image: { type: String, default: "" }
        },

        buyerName: {
            type: String,
            default: ""
        },

        price: {
            type: Number,
            required: true,
            set: (value) => Math.round(Number(value))
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

export default mongoose.model("Purchase", purchaseSchema);
