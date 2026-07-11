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

const getProfile = async (req, res) => {

    res.status(200).json({
        user: req.user
    });

};

export {
    register,
    login,
    getProfile
};