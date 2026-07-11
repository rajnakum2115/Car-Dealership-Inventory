import express from "express";

import {
    getAllVehicles,
    createVehicle,
    searchVehicle,
    updateVehicleDetails,
    removeVehicle,
    purchaseVehicleController,
    restockVehicleController
} from "../controllers/vehicleController.js";

import protect from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllVehicles);

router.get("/search", searchVehicle);

// Protected routes
router.post("/", protect, createVehicle);

router.put("/:id", protect, updateVehicleDetails);

// Admin only
router.delete(
    "/:id",
    protect,
    adminMiddleware,
    removeVehicle
);

router.post(
    "/:id/purchase",
    protect,
    purchaseVehicleController
);

router.post(
    "/:id/restock",
    protect,
    adminMiddleware,
    restockVehicleController
);

export default router;