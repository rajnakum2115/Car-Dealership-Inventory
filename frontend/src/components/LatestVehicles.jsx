import { useEffect, useState } from "react";
import { getVehicles } from "../services/vehicleService";

function LatestVehicles() {

    const [vehicles, setVehicles] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchVehicles = async () => {

            try {

                const data = await getVehicles();

                // Show latest 4 vehicles
                setVehicles(data.slice(-4).reverse());

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchVehicles();

    }, []);

    if (loading) {

        return (

            <div className="text-center py-10">

                Loading Latest Vehicles...

            </div>

        );

    }

    return (

        <section className="py-20 bg-white">

            <div className="max-w-7xl mx-auto px-6">

                <div className="flex justify-between items-center mb-10">

                    <div>

                        <h2 className="text-4xl font-bold">

                            Latest Vehicles

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Check out our newest arrivals.

                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {

                        vehicles.map((vehicle) => (

                            <div
                                key={vehicle._id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
                            >

                                <img
                                    src={`/images/${vehicle.image}`}
                                    alt={vehicle.name}
                                    className="w-full h-56 object-cover"
                                />

                                <div className="p-5">

                                    <h3 className="text-xl font-bold">

                                        {vehicle.name}

                                    </h3>

                                    <p className="text-gray-500 mt-1">

                                        {vehicle.brand}

                                    </p>

                                    <h4 className="text-blue-600 font-bold text-xl mt-3">

                                        ₹ {vehicle.price.toLocaleString()}

                                    </h4>

                                    <button
                                        className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                                    >

                                        View Details

                                    </button>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default LatestVehicles;