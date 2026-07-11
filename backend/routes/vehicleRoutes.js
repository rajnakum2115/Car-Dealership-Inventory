import express from "express";
import {
    getAllVehicles,
    createVehicle,
    searchVehicle,
    updateVehicleDetails
} from "../controllers/vehicleController.js";

const router = express.Router();

router.get("/", getAllVehicles);

router.get("/search", searchVehicle);

router.post("/", createVehicle);

router.put("/:id", updateVehicleDetails);

export default router;