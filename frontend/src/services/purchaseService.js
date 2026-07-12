import api from "./api";

// Feature 2 — the logged-in user's own order history.
export const getMyOrders = async () => {
    const response = await api.get("/purchases/my-orders");
    return response.data;
};

// Feature 3 — every purchase across all users (admin only).
export const getAllOrders = async () => {
    const response = await api.get("/purchases", {
        params: { _t: Date.now() },
        headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache"
        }
    });
    return response.data;
};

export const updateOrder = async (orderId, data) => {
    const response = await api.put(`/purchases/my-orders/${orderId}`, data);
    return response.data;
};

export const deleteOrder = async (orderId) => {
    const response = await api.delete(`/purchases/my-orders/${orderId}`);
    return response.data;
};
