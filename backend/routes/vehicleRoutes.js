import express from "express";

import {
    getAllVehicles,
    getVehicle,
    createVehicle,
    searchVehicle,
    updateVehicleDetails,
    removeVehicle,
    purchaseVehicleController,
    restockVehicleController
} from "../controllers/vehicleController.js";

import protect from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public routes
// NOTE: "/search" must come before "/:id" otherwise Express treats
// "search" as an id parameter and the route is unreachable.
router.get("/", getAllVehicles);
router.get("/search", searchVehicle);
router.get("/:id", getVehicle);

// Protected routes — create/update accept an optional image upload
router.post("/", protect, upload.single("image"), createVehicle);
router.put("/:id", protect, upload.single("image"), updateVehicleDetails);

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
