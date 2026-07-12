import bcrypt from "bcrypt";
import User from "../models/User.js";
import {
    registerUser,
    loginUser
} from "../services/authService.js";

const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message
        });
    }
};

const login = async (req, res) => {

    try {

        const result = await loginUser(req.body);

        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: error.message
        });

    }

};

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                message: "Email and new password are required"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "New password must be at least 6 characters"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({
            message: "Password reset successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
};

const getProfile = async (req, res) => {

    res.status(200).json({
        user: req.user
    });

};

export {
    register,
    login,
    getProfile,
    resetPassword
};