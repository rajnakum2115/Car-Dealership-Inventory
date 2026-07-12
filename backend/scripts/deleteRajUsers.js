import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../models/User.js";

dotenv.config();

const deleteRajUsers = async () => {
    if (!process.env.MONGODB_URL) {
        console.error("MONGODB_URL is not set in backend/.env");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        // Match users named 'Raj' (case-insensitive) OR emails starting with 'raj' (case-insensitive)
        const filter = {
            $or: [
                { name: { $regex: "^raj$", $options: "i" } },
                { email: { $regex: "^raj", $options: "i" } }
            ]
        };

        const result = await User.deleteMany(filter);

        console.log(`Deleted ${result.deletedCount} user(s) matching filter`);

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("Failed to delete users:", error.message);
        try { await mongoose.disconnect(); } catch (e) {}
        process.exit(1);
    }
};

deleteRajUsers();
