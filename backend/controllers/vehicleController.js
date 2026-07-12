import {
    getVehicles,
    getPaginatedVehicles,
    getVehicleById,
    addVehicle,
    searchVehicles,
    updateVehicle,
    deleteVehicle,
    purchaseVehicle,
    restockVehicle
} from "../services/vehicleService.js";

import handleImageUpload from "../utils/handleImageUpload.js";
import parsePrice from "../utils/parsePrice.js";

const getAllVehicles = async (req, res) => {
    try {
        // When a page is requested, return the paginated + filterable payload
        // used by the Vehicles page. Otherwise keep the legacy behaviour of
        // returning a flat array so the home page and admin table keep working.
        if (req.query.page) {
            const result = await getPaginatedVehicles(req.query);
            return res.status(200).json(result);
        }

        const vehicles = await getVehicles();
        res.status(200).json(vehicles);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getVehicle = async (req, res) => {

    try {

        const vehicle = await getVehicleById(req.params.id);

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

const createVehicle = async (req, res) => {
    try {
        const body = req.body;

        // multer populates req.file when an image is uploaded.
        const imageUrl = await handleImageUpload(req.file);

        const vehicle = await addVehicle({
            name: body.name,
            brand: body.brand,
            category: body.category,
            price: parsePrice(body.price),
            image: imageUrl || body.image,
            description: body.description,
            quantity: Number(body.quantity),
            fuel: body.fuel,
            transmission: body.transmission,
            year: body.year ? Number(body.year) : undefined
        });

        res.status(201).json(vehicle);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchVehicle = async (req, res) => {

    try {

        const result = await searchVehicles(req.query);

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const updateVehicleDetails = async (req, res) => {

    try {
        const body = req.body;

        // Only overwrite fields that were actually provided so partial
        // updates (e.g. just the price) don't wipe the other values.
        const data = {};

        // Numeric fields must be explicitly converted because multer
        // delivers all multipart body values as strings.
        const textFields = ["name", "brand", "category", "description", "fuel", "transmission"];

        textFields.forEach((field) => {
            if (body[field] !== undefined && body[field] !== "") {
                data[field] = body[field];
            }
        });

        if (body.price !== undefined && body.price !== "") {
            data.price = parsePrice(body.price);
        }

        ["quantity", "year"].forEach((field) => {
            if (body[field] !== undefined && body[field] !== "") {
                data[field] = Number(body[field]);
            }
        });

        // If a new image was uploaded, use the returned URL. Otherwise keep
        // the existing image value untouched.
        const imageUrl = await handleImageUpload(req.file);
        if (imageUrl) {
            data.image = imageUrl;
        }

        const vehicle = await updateVehicle(req.params.id, data);

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

const purchaseVehicleController = async (req, res) => {

    try {

        const vehicle = await purchaseVehicle(req.params.id, req.user._id);

        res.status(200).json(vehicle);

    }

    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

const restockVehicleController = async (req, res) => {

    try {

        const vehicle = await restockVehicle(
            req.params.id,
            req.body.quantity
        );

        res.status(200).json(vehicle);

    }

    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

export {
    getAllVehicles,
    getVehicle,
    createVehicle,
    searchVehicle,
    updateVehicleDetails,
    removeVehicle,
    purchaseVehicleController,
    restockVehicleController
};
