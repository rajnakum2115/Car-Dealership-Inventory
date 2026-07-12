import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

import User from "../models/User.js";

dotenv.config();

// Default admin credentials — change these in this file before running if
// you want a different admin email/password.
const ADMIN_NAME = "Admin";
const ADMIN_EMAIL = "admin@cardealer.com";
const ADMIN_PASSWORD = "admin123";

const seedAdmin = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not set in backend/.env");
        }

        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected");

        const existing = await User.findOne({ email: ADMIN_EMAIL });

        if (existing) {
            // Make sure an existing admin@cardealer.com user is an admin.
            if (existing.role !== "admin") {
                existing.role = "admin";
                await existing.save();
                console.log(`Existing user promoted to admin: ${ADMIN_EMAIL}`);
            } else {
                console.log(`Admin already exists: ${ADMIN_EMAIL}`);
            }
        } else {
            const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

            await User.create({
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: hashedPassword,
                role: "admin"
            });

            console.log("Admin created:");
            console.log(`   Email   : ${ADMIN_EMAIL}`);
            console.log(`   Password: ${ADMIN_PASSWORD}`);
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error.message);
        await mongoose.disconnect();
        process.exit(1);
    }
};

seedAdmin();
