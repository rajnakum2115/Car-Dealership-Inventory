import Purchase from "../models/Purchase.js";

// All purchases for a single user, newest first.
const getMyOrders = async (userId) => {
    return await Purchase.find({ userId })
        .sort({ createdAt: -1 });
};

// All purchases, with the buyer's name populated — used by the admin
// Orders screen.
const getAllOrders = async () => {
    return await Purchase.find()
        .populate("userId", "name email")
        .sort({ createdAt: -1 });
};

export {
    getMyOrders,
    getAllOrders
};
