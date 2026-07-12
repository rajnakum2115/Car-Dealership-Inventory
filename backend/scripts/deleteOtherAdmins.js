import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../models/User.js";

dotenv.config();

const ADMIN_EMAIL = "admin@cardealer.com";

const deleteOtherAdmins = async () => {
    if (!process.env.MONGODB_URL) {
        console.error("MONGODB_URL is not set in backend/.env");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        // Delete any user whose role is 'admin' AND whose email is not the canonical admin
        const filter = {
            role: "admin",
            email: { $ne: ADMIN_EMAIL }
        };

        const result = await User.deleteMany(filter);

        console.log(`Deleted ${result.deletedCount} admin user(s) (excluded ${ADMIN_EMAIL})`);

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("Failed to delete admin users:", error.message);
        try { await mongoose.disconnect(); } catch (e) {}
        process.exit(1);
    }
};

deleteOtherAdmins();
