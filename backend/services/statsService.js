import Vehicle from "../models/Vehicle.js";
import User from "../models/User.js";
import Purchase from "../models/Purchase.js";

// Real dashboard counts (Feature 4) — replaces the old hardcoded numbers.
const getStats = async () => {
    const [
        totalVehicles,
        totalUsers,
        totalOrders,
        outOfStock
    ] = await Promise.all([
        Vehicle.countDocuments(),
        User.countDocuments(),
        Purchase.countDocuments(),
        Vehicle.countDocuments({ quantity: { $lte: 0 } })
    ]);

    return {
        totalVehicles,
        totalUsers,
        totalOrders,
        outOfStock
    };
};

export {
    getStats
};
