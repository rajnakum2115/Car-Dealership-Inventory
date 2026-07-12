import api from "./api";

export const getVehicles = async () => {

    const response = await api.get("/vehicles");

    return response.data;

};

// Paginated vehicle list — used by the Vehicles page (Feature 6).
export const getVehiclesPage = async (page = 1, limit = 12) => {

    const response = await api.get("/vehicles", {
        params: { page, limit }
    });

    return response.data;

};

export const getVehicleById = async (id) => {

    const response = await api.get(`/vehicles/${id}`);

    return response.data;

};

export const purchaseVehicle = async (id) => {

    const response = await api.post(`/vehicles/${id}/purchase`);

    return response.data;

};

// Feature 10 — search from backend with filters and pagination.
export const searchVehicles = async (params) => {

    const response = await api.get("/vehicles/search", { params });

    return response.data;

};

// Feature 5 — send FormData (multipart) when an image file is included.
export const createVehicle = async (vehicleData) => {

    // Let the browser set `Content-Type` for FormData (boundary included).
    const config = vehicleData instanceof FormData ? {} : {};

    console.log("[Vehicle Price] createVehicle request", {
        isFormData: vehicleData instanceof FormData,
        payload: vehicleData
    });

    const response = await api.post("/vehicles", vehicleData, config);

    return response.data;

};

// Feature 5 — send FormData (multipart) when an image file is included.
export const updateVehicle = async (id, vehicleData) => {

    // Let the browser set `Content-Type` for FormData (boundary included).
    const config = vehicleData instanceof FormData ? {} : {};

    console.log("[Vehicle Price] updateVehicle request", {
        id,
        isFormData: vehicleData instanceof FormData,
        payload: vehicleData
    });

    const response = await api.put(`/vehicles/${id}`, vehicleData, config);

    return response.data;

};

export const deleteVehicle = async (id) => {

    const response = await api.delete(`/vehicles/${id}`);

    return response.data;

};

export const restockVehicle = async (id, quantity) => {

    const response = await api.post(

        `/vehicles/${id}/restock`,

        {
            quantity
        }

    );

    return response.data;

};