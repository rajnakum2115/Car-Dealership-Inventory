import {
    getVehicles,
    addVehicle
} from "../services/vehicleService.js";

const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await getVehicles();

        res.status(200).json(vehicles);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createVehicle = async (req, res) => {
    try {
        console.log("Controller reached");
        console.log(req.body);

        const vehicle = await addVehicle({
            name: req.body.name,
            brand: req.body.brand,
            category: req.body.category,
            price: req.body.price,
            image: req.body.image,
            description: req.body.description,
            quantity: req.body.quantity
        });

        console.log("Vehicle created");

        res.status(201).json(vehicle);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllVehicles,
    createVehicle
};