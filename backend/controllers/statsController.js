import { getStats } from "../services/statsService.js";

const dashboardStats = async (req, res) => {
    try {
        const stats = await getStats();
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export {
    dashboardStats
};
