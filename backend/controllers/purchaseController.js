import { getMyOrders, getAllOrders } from "../services/purchaseService.js";

const myOrders = async (req, res) => {
    try {
        const orders = await getMyOrders(req.user._id);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const allOrders = async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export {
    myOrders,
    allOrders
};
