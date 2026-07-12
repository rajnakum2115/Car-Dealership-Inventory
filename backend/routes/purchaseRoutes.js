import express from "express";

import protect from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import { myOrders, allOrders, updateMyOrder, cancelMyOrder } from "../controllers/purchaseController.js";

const router = express.Router();

// Logged-in user's own order history
router.get("/my-orders", protect, myOrders);
router.put("/my-orders/:orderId", protect, updateMyOrder);
router.delete("/my-orders/:orderId", protect, cancelMyOrder);

// Admin only — every purchase across all users
router.get("/", protect, adminMiddleware, allOrders);

export default router;
