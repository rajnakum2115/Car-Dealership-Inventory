import api from "./api";

export const getProfile = async () => {

    const response = await api.get("/users/profile");

    return response.data;

};

export const updateProfile = async (user) => {

    const response = await api.put(

        "/users/profile",

        user

    );

    return response.data;

};

// Feature 1 — change password.
export const changePassword = async (data) => {

    const response = await api.put("/users/password", data);

    return response.data;

};