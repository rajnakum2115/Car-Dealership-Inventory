import Vehicle from "../models/Vehicle.js";

const getVehicles = async () => {
    return await Vehicle.find();
};

const addVehicle = async (data) => {
    return await Vehicle.create(data);
};

const searchVehicles = async (query) => {

    const filter = {};

    if (query.brand) {
        filter.brand = { $regex: query.brand, $options: "i" };
    }

    if (query.name) {
        filter.name = { $regex: query.name, $options: "i" };
    }

    if (query.category) {
        filter.category = { $regex: query.category, $options: "i" };
    }

    if (query.minPrice || query.maxPrice) {

        filter.price = {};

        if (query.minPrice)
            filter.price.$gte = Number(query.minPrice);

        if (query.maxPrice)
            filter.price.$lte = Number(query.maxPrice);
    }

    return await Vehicle.find(filter);

};

const updateVehicle = async (id, data) => {

    return await Vehicle.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );

};

const deleteVehicle = async (id) => {

    return await Vehicle.findByIdAndDelete(id);

};

const purchaseVehicle = async (id) => {

    const vehicle = await Vehicle.findById(id);

    if (!vehicle)
        throw new Error("Vehicle not found");

    if (vehicle.quantity <= 0)
        throw new Error("Vehicle out of stock");

    vehicle.quantity -= 1;

    await vehicle.save();

    return vehicle;

};

export {
    getVehicles,
    addVehicle,
    searchVehicles,
    updateVehicle,
    deleteVehicle,
    purchaseVehicle
};