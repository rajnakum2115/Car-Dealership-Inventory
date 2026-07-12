import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

import { getVehicleById, purchaseVehicle } from "../services/vehicleService";
import getImageSrc from "../utils/imageUrl";
import { formatINR } from "../utils/price";

function VehicleDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        fetchVehicle();
    }, []);

    const fetchVehicle = async () => {

        try {

            const data = await getVehicleById(id);
            setVehicle(data);

        } catch (error) {

            toast.error("Failed to load vehicle details");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return (
            <>
                <Navbar />
                <Spinner label="Loading vehicle details..." />
                <Footer />
            </>
        );
    }

    if (!vehicle) {
        return (
            <>
                <Navbar />
                <div className="text-center py-20">
                    <h1 className="text-3xl font-bold text-gray-500">Vehicle not found</h1>
                </div>
                <Footer />
            </>
        );
    }

    const handlePurchase = async () => {

        setPurchasing(true);

        try {

            const data = await purchaseVehicle(vehicle._id);

            setVehicle(data);

            toast.success("Vehicle purchased successfully!");

            navigate("/orders");

        } catch (error) {

            toast.error(error.response?.data?.message || "Purchase failed");

        } finally {

            setPurchasing(false);

        }

    };

    return (

        <>

            <Navbar />

            <section className="bg-gray-100 py-12 min-h-screen">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="bg-white rounded-2xl shadow-lg grid lg:grid-cols-2 gap-10 p-8">

                        {/* Vehicle Image */}

                        <img
                            src={getImageSrc(vehicle.image)}
                            alt={vehicle.name}
                            className="w-full h-[450px] object-cover rounded-xl"
                        />

                        {/* Vehicle Details */}

                        <div>

                            <h1 className="text-5xl font-bold mb-4">
                                {vehicle.name}
                            </h1>

                            <h2 className="text-2xl text-blue-600 font-semibold mb-8">
                                ₹ {formatINR(vehicle.price)}
                            </h2>

                            <div className="space-y-4 text-lg">

                                <p>
                                    <strong>Brand :</strong> {vehicle.brand}
                                </p>

                                <p>
                                    <strong>Category :</strong> {vehicle.category}
                                </p>

                                <p>
                                    <strong>Fuel :</strong> {vehicle.fuel}
                                </p>

                                <p>
                                    <strong>Transmission :</strong> {vehicle.transmission}
                                </p>

                                <p>
                                    <strong>Year :</strong> {vehicle.year}
                                </p>

                                <p>
                                    <strong>Quantity :</strong>
                                    <span
                                        className={vehicle.quantity > 0 ? "text-green-600 font-bold ml-1" : "text-red-600 font-bold ml-1"}
                                    >{vehicle.quantity}</span>
                                </p>

                            </div>

                            <div className="mt-8">

                                <h3 className="text-2xl font-bold mb-3">
                                    Description
                                </h3>

                                <p className="text-gray-600 leading-8">
                                    {vehicle.description}
                                </p>

                            </div>

                            <button
                                onClick={handlePurchase}
                                disabled={vehicle.quantity === 0 || purchasing}
                                className={`mt-10 px-10 py-4 rounded-lg text-lg text-white transition
                                    ${vehicle.quantity === 0
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700"}
                                    ${purchasing ? "opacity-50 cursor-not-allowed" : ""}
                                `}
                            >
                                {vehicle.quantity === 0
                                    ? "Out of Stock"
                                    : purchasing
                                        ? "Processing..."
                                        : "Purchase Vehicle"}
                            </button>

                        </div>

                    </div>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default VehicleDetails;