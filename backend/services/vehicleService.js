import Vehicle from "../models/Vehicle.js";

const getVehicles = async () => {
    return await Vehicle.find();
};

export {
    getVehicles
};