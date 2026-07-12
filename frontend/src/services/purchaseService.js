import api from "./api";

// Feature 2 — the logged-in user's own order history.
export const getMyOrders = async () => {
    const response = await api.get("/purchases/my-orders");
    return response.data;
};

// Feature 3 — every purchase across all users (admin only).
export const getAllOrders = async () => {
    const response = await api.get("/purchases");
    return response.data;
};
