import bcrypt from "bcrypt";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const registerUser = async (userData) => {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "user"
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};

const loginUser = async (userData) => {

    const { email, password } = userData;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare entered password with hashed password
    const isPasswordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatch) {
        throw new Error("Invalid email or password");
    }

    return {
        token: generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

export {
    registerUser,
    loginUser
};