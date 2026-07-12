import bcrypt from "bcrypt";

import User from "../models/User.js";

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id).select("-password");

        res.status(200).json(user);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

const updateProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        user.name = req.body.name || user.name;

        await user.save();

        res.status(200).json(user);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Feature 1 — change password. Verifies the current password before
// accepting the new one.
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "New password must be at least 6 characters"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({
            message: "Password updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export {

    getProfile,

    updateProfile,

    changePassword

};
