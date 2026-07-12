import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve locally uploaded images (Feature 5 fallback when Cloudinary is not
// configured). Cloudinary URLs are absolute and bypass this entirely.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/admin", adminRoutes);

export default app;
