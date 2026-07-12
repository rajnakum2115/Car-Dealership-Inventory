import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    getProfile,
    updateProfile,
    changePassword
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

// Feature 1 — change password
router.put("/password", protect, changePassword);

export default router;
