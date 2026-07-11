import express from "express";
import {
    getAllVehicles,
    createVehicle
} from "../controllers/vehicleController.js";

const router = express.Router();

router.get("/", getAllVehicles);

router.post("/", createVehicle);

export default router;