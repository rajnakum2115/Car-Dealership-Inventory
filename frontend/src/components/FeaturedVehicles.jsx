import { useEffect, useState } from "react";

import { getVehicles } from "../services/vehicleService";

import VehicleCard from "./VehicleCard";
import Spinner from "./Spinner";

function FeaturedVehicles() {

    const [vehicles, setVehicles] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const fetchVehicles = async () => {

            try {

                const data = await getVehicles();

                // Show only first 4 vehicles
                setVehicles(data.slice(0, 4));

            } catch (err) {

                console.error(err);

                setError("Unable to load vehicles.");

            } finally {

                setLoading(false);

            }

        };

        fetchVehicles();

    }, []);

    if (loading) {
        return <Spinner label="Loading vehicles..." />;
    }

    if (error) {

        return (

            <div className="text-center py-20">

                <h2 className="text-red-600 text-2xl">
                    {error}
                </h2>

            </div>

        );

    }

    return (

        <section className="py-20 bg-gray-100">

            <div className="max-w-7xl mx-auto px-6">

                <div className="flex justify-between items-center mb-10">

                    <div>

                        <h2 className="text-4xl font-bold text-gray-800">

                            Featured Vehicles

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Explore our premium collection of vehicles.

                        </p>

                    </div>

                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                    >
                        View All
                    </button>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {

                        vehicles.map((vehicle) => (

                            <VehicleCard
                                key={vehicle._id}
                                vehicle={vehicle}
                            />

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default FeaturedVehicles;