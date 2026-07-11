import {
    getVehicles,
    addVehicle,
    searchVehicles,
    updateVehicle,
    deleteVehicle
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

const searchVehicle = async (req, res) => {

    try {

        const vehicles = await searchVehicles(req.query);

        res.status(200).json(vehicles);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const updateVehicleDetails = async (req, res) => {

    try {

        const vehicle = await updateVehicle(
            req.params.id,
            req.body
        );

        if (!vehicle) {

            return res.status(404).json({
                message: "Vehicle not found"
            });

        }

        res.status(200).json(vehicle);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const removeVehicle = async (req, res) => {

    try {

        const vehicle = await deleteVehicle(req.params.id);

        if (!vehicle) {

            return res.status(404).json({
                message: "Vehicle not found"
            });

        }

        res.status(200).json({
            message: "Vehicle deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export {
    getAllVehicles,
    createVehicle,
    searchVehicle,
    updateVehicleDetails,
    removeVehicle
};