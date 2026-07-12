import Purchase from "../models/Purchase.js";
import Vehicle from "../models/Vehicle.js";

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

const updateOrder = async (orderId, userId, updates) => {
    const purchase = await Purchase.findOne({ _id: orderId, userId });

    if (!purchase) {
        throw new Error("Order not found");
    }

    if (updates.quantity != null) {
        const newQuantity = Number(updates.quantity);

        if (Number.isNaN(newQuantity) || newQuantity < 1) {
            throw new Error("Quantity must be at least 1");
        }

        const quantityDiff = newQuantity - purchase.quantity;

        if (quantityDiff !== 0) {
            const vehicle = await Vehicle.findById(purchase.vehicleId);

            if (!vehicle) {
                throw new Error("Associated vehicle not found");
            }

            if (quantityDiff > 0 && vehicle.quantity < quantityDiff) {
                throw new Error("Not enough stock available to enlarge the order");
            }

            vehicle.quantity -= quantityDiff;
            await vehicle.save();
            purchase.quantity = newQuantity;
        }
    }

    return await purchase.save();
};

const deleteOrder = async (orderId, userId) => {
    const purchase = await Purchase.findOne({ _id: orderId, userId });

    if (!purchase) {
        throw new Error("Order not found");
    }

    const vehicle = await Vehicle.findById(purchase.vehicleId);

    if (vehicle) {
        vehicle.quantity += purchase.quantity;
        await vehicle.save();
    }

    await Purchase.deleteOne({ _id: orderId, userId });
};

export {
    getMyOrders,
    getAllOrders,
    updateOrder,
    deleteOrder
};
