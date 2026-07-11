import Vehicle from "../models/Vehicle.js";

const getVehicles = async () => {
    return await Vehicle.find();
};

const addVehicle = async (data) => {
    return await Vehicle.create(data);
};

export {
    getVehicles,
    addVehicle
};