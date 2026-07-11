import bcrypt from "bcrypt";

import User from "../models/User.js";

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

export {
    registerUser
};