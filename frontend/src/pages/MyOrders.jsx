import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

import { getMyOrders } from "../services/purchaseService";
import getImageSrc from "../utils/imageUrl";
import { formatINR } from "../utils/price";

function MyOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const data = await getMyOrders();
            setOrders(data);

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to load orders");

        } finally {

            setLoading(false);

        }

    };

    return (

        <>

            <Navbar />

            <section className="bg-gray-100 min-h-screen py-12">

                <div className="max-w-6xl mx-auto px-6">

                    <h1 className="text-4xl font-bold text-center mb-10">
                        My Orders
                    </h1>

                    {loading ? (

                        <Spinner label="Loading orders..." />

                    ) : orders.length === 0 ? (

                        <div className="text-center py-20">
                            <p className="text-2xl text-gray-500">
                                You haven't purchased any vehicles yet.
                            </p>
                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {orders.map((order) => (

                                <div
                                    key={order._id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                                >

                                    <img
                                        src={getImageSrc(order.vehicleSnapshot?.image)}
                                        alt={order.vehicleSnapshot?.name || "Vehicle"}
                                        className="w-full h-48 object-cover"
                                    />

                                    <div className="p-5">

                                        <h2 className="text-xl font-bold text-gray-800">
                                            {order.vehicleSnapshot?.name || "Unknown Vehicle"}
                                        </h2>

                                        <p className="text-gray-500 mt-1">
                                            {order.vehicleSnapshot?.brand || ""}
                                        </p>

                                        <div className="mt-4 space-y-2">

                                            <p className="text-blue-600 font-bold text-lg">
                                                ₹ {formatINR(order.price)}
                                            </p>

                                            <p className="text-gray-600">
                                                <strong>Quantity:</strong> {order.quantity}
                                            </p>

                                            <p className="text-gray-500 text-sm">
                                                Purchased on{" "}
                                                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric"
                                                })}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </section>

            <Footer />

        </>

    );

}

export default MyOrders;
