import Vehicle from "../models/Vehicle.js";
import Purchase from "../models/Purchase.js";

const getVehicles = async () => {
    return await Vehicle.find();
};

// Paginated + optionally filtered list used by the Vehicles page.
// When no page/limit are supplied, every existing caller still works because
// the controller only paginates when `page` is present.
const getPaginatedVehicles = async (query) => {
    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.max(parseInt(query.limit) || 12, 1);
    const skip = (page - 1) * limit;

    const filter = {};

    if (query.search) {
        const regex = new RegExp(query.search, "i");
        filter.$or = [{ name: regex }, { brand: regex }];
    }

    if (query.category && query.category !== "All") {
        filter.category = query.category;
    }

    if (query.fuel && query.fuel !== "All") {
        filter.fuel = query.fuel;
    }

    let sortOption = {};
    if (query.sort === "low") sortOption = { price: 1 };
    else if (query.sort === "high") sortOption = { price: -1 };
    else sortOption = { createdAt: -1 };

    const totalVehicles = await Vehicle.countDocuments(filter);
    const vehicles = await Vehicle.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    return {
        vehicles,
        currentPage: page,
        totalPages: Math.ceil(totalVehicles / limit) || 1,
        totalVehicles
    };
};

const getVehicleById = async (id) => {
    return await Vehicle.findById(id);
};

const addVehicle = async (data) => {
    return await Vehicle.create(data);
};

// Backend search used by /api/vehicles/search. Supports rich filters,
// sorting and pagination. Returns the paginated result object.
const searchVehicles = async (query) => {
    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.max(parseInt(query.limit) || 12, 1);
    const skip = (page - 1) * limit;

    const filter = {};

    if (query.brand) {
        filter.brand = { $regex: query.brand, $options: "i" };
    }

    if (query.name) {
        filter.name = { $regex: query.name, $options: "i" };
    }

    if (query.category && query.category !== "All") {
        filter.category = { $regex: query.category, $options: "i" };
    }

    if (query.fuel && query.fuel !== "All") {
        filter.fuel = { $regex: query.fuel, $options: "i" };
    }

    if (query.transmission) {
        filter.transmission = { $regex: query.transmission, $options: "i" };
    }

    if (query.year) {
        filter.year = Number(query.year);
    }

    if (query.minPrice || query.maxPrice) {
        filter.price = {};

        if (query.minPrice)
            filter.price.$gte = Number(query.minPrice);

        if (query.maxPrice)
            filter.price.$lte = Number(query.maxPrice);
    }

    let sortOption = {};
    if (query.sort === "low") sortOption = { price: 1 };
    else if (query.sort === "high") sortOption = { price: -1 };
    else sortOption = { createdAt: -1 };

    const totalVehicles = await Vehicle.countDocuments(filter);
    const vehicles = await Vehicle.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    return {
        vehicles,
        currentPage: page,
        totalPages: Math.ceil(totalVehicles / limit) || 1,
        totalVehicles
    };
};

const updateVehicle = async (id, data) => {
    return await Vehicle.findByIdAndUpdate(
        id,
        data,
        {
            // `new` is deprecated in recent Mongoose versions — use `returnDocument`.
            returnDocument: "after",
            runValidators: true
        }
    );
};

const deleteVehicle = async (id) => {
    return await Vehicle.findByIdAndDelete(id);
};

// Purchasing a vehicle decrements its stock AND records a Purchase row so
// the user can see it in "My Orders" and admins can see it in Orders.
const purchaseVehicle = async (id, userId, userName) => {
    const vehicle = await Vehicle.findById(id);

    if (!vehicle)
        throw new Error("Vehicle not found");

    if (vehicle.quantity <= 0)
        throw new Error("Vehicle out of stock");

    vehicle.quantity -= 1;
    await vehicle.save();

    await Purchase.create({
        userId,
        vehicleId: vehicle._id,
        vehicleSnapshot: {
            name: vehicle.name,
            brand: vehicle.brand,
            image: vehicle.image
        },
        buyerName: userName || "",
        price: vehicle.price,
        quantity: 1
    });

    return vehicle;
};

const restockVehicle = async (id, quantity) => {
    const vehicle = await Vehicle.findById(id);

    if (!vehicle)
        throw new Error("Vehicle not found");

    vehicle.quantity += quantity;

    await vehicle.save();

    return vehicle;
};

export {
    getVehicles,
    getPaginatedVehicles,
    getVehicleById,
    addVehicle,
    searchVehicles,
    updateVehicle,
    deleteVehicle,
    purchaseVehicle,
    restockVehicle
};
