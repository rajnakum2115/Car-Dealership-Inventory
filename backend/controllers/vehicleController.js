import { getVehicles } from "../services/vehicleService.js";

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

export {
    getAllVehicles
};