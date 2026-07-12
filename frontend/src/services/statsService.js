import api from "./api";

// Feature 4 — dashboard statistics (admin only).
export const getStats = async () => {
    const response = await api.get("/admin/stats");
    return response.data;
};
