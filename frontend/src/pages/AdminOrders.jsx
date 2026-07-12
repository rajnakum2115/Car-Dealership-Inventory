import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

import { getAllOrders } from "../services/purchaseService";
import getImageSrc from "../utils/imageUrl";
import { formatINR } from "../utils/price";

function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const data = await getAllOrders();
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

                <div className="max-w-7xl mx-auto px-6">

                    <h1 className="text-4xl font-bold mb-10">
                        All Orders (Admin)
                    </h1>

                    {loading ? (

                        <Spinner label="Loading orders..." />

                    ) : orders.length === 0 ? (

                        <div className="text-center py-20">
                            <p className="text-2xl text-gray-500">
                                No purchases have been made yet.
                            </p>
                        </div>

                    ) : (

                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                            <table className="w-full">

                                <thead className="bg-slate-900 text-white">
                                    <tr>
                                        <th className="p-4">Image</th>
                                        <th className="p-4">Vehicle</th>
                                        <th className="p-4">Buyer</th>
                                        <th className="p-4">Price</th>
                                        <th className="p-4">Qty</th>
                                        <th className="p-4">Date</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {orders.map((order) => (

                                        <tr
                                            key={order._id}
                                            className="text-center border-b hover:bg-gray-50 transition"
                                        >

                                            <td className="py-4">
                                                <img
                                                    src={getImageSrc(order.vehicleSnapshot?.image)}
                                                    alt={order.vehicleSnapshot?.name || "Vehicle"}
                                                    className="w-16 h-12 object-cover rounded mx-auto"
                                                />
                                            </td>

                                            <td className="py-4">
                                                <p className="font-semibold">{order.vehicleSnapshot?.name || "Unknown"}</p>
                                                <p className="text-sm text-gray-500">{order.vehicleSnapshot?.brand || ""}</p>
                                            </td>

                                            <td className="py-4">
                                                <p className="font-medium">{order.userId?.name || "Unknown"}</p>
                                                <p className="text-sm text-gray-500">{order.userId?.email || ""}</p>
                                            </td>

                                            <td className="py-4 font-semibold text-blue-600">
                                                ₹ {formatINR(order.price)}
                                            </td>

                                            <td className="py-4">
                                                {order.quantity}
                                            </td>

                                            <td className="py-4 text-sm text-gray-600">
                                                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric"
                                                })}
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </section>

            <Footer />

        </>

    );

}

export default AdminOrders;
