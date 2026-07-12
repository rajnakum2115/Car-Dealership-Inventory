import { useNavigate } from "react-router-dom";

import getImageSrc from "../utils/imageUrl";
import { formatINR } from "../utils/price";

function VehicleCard({ vehicle }) {

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

            <img
                src={getImageSrc(vehicle.image)}
                alt={vehicle.name}
                className="w-full h-56 object-cover"
            />

            <div className="p-5">

                <h2 className="text-2xl font-bold">
                    {vehicle.name}
                </h2>

                <p className="text-gray-600">
                    {vehicle.brand}
                </p>

                <p className="text-gray-500">
                    {vehicle.category}
                </p>

                <p className="mt-2">
                    Fuel : {vehicle.fuel}
                </p>

                <p>
                    Transmission : {vehicle.transmission}
                </p>

                <p>
                    Year : {vehicle.year}
                </p>

                <h3 className="text-blue-600 text-2xl font-bold mt-4">

                    ₹ {formatINR(vehicle.price)}

                </h3>

                <button
                    onClick={() => navigate(`/vehicles/${vehicle._id}`)}
                    className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
                >
                    View Details
                </button>

            </div>

        </div>

    );

}

export default VehicleCard;