import { getMyOrders, getAllOrders, updateOrder, deleteOrder } from "../services/purchaseService.js";

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

const updateMyOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const updatedOrder = await updateOrder(orderId, req.user._id, req.body);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const cancelMyOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        await deleteOrder(orderId, req.user._id);
        res.status(200).json({
            message: "Order deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export {
    myOrders,
    allOrders,
    updateMyOrder,
    cancelMyOrder
};
