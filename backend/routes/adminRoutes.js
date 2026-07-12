import express from "express";

import protect from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import { dashboardStats } from "../controllers/statsController.js";

const router = express.Router();

// Admin-only dashboard statistics (Feature 4)
router.get("/stats", protect, adminMiddleware, dashboardStats);

export default router;
