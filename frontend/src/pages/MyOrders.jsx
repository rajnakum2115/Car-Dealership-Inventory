import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

import { getMyOrders, getAllOrders, updateOrder, deleteOrder } from "../services/purchaseService";
import getImageSrc from "../utils/imageUrl";
import { formatINR } from "../utils/price";

function MyOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editedQuantities, setEditedQuantities] = useState({});
    const [processingOrderId, setProcessingOrderId] = useState(null);
    const { isAdmin } = useAuth();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const data = isAdmin ? await getAllOrders() : await getMyOrders();
            setOrders(data);
            setEditedQuantities(
                data.reduce((acc, order) => {
                    acc[order._id] = order.quantity;
                    return acc;
                }, {})
            );

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to load orders");

        } finally {

            setLoading(false);

        }

    };

    const handleQuantityChange = (orderId, value) => {
        setEditedQuantities((prev) => ({
            ...prev,
            [orderId]: value
        }));
    };

    const handleUpdateOrder = async (orderId) => {
        const newQuantity = Number(editedQuantities[orderId]);

        if (!newQuantity || newQuantity < 1) {
            toast.error("Quantity must be at least 1");
            return;
        }

        setProcessingOrderId(orderId);

        try {
            await updateOrder(orderId, { quantity: newQuantity });
            toast.success("Order updated successfully");
            await fetchOrders();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update order");
        } finally {
            setProcessingOrderId(null);
        }
    };

    const handleCancelOrder = async (orderId) => {
        setProcessingOrderId(orderId);

        try {
            await deleteOrder(orderId);
            toast.success("Order cancelled successfully");
            await fetchOrders();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to cancel order");
        } finally {
            setProcessingOrderId(null);
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

                                            {isAdmin && (
                                                <p className="text-gray-700 mt-1 font-medium">
                                                    Buyer: {order.buyerName || order.userId?.name || "Unknown"}
                                                </p>
                                            )}

<div className="mt-4 space-y-3">

                                        <p className="text-blue-600 font-bold text-lg">
                                            ₹ {formatINR(order.price)}
                                        </p>

                                        {!isAdmin ? (
                                            <div className="flex flex-col gap-2">
                                                <label className="text-gray-600 font-medium">
                                                    Quantity
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={editedQuantities[order._id] ?? order.quantity}
                                                    onChange={(e) => handleQuantityChange(order._id, e.target.value)}
                                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-gray-700">
                                                <strong>Quantity:</strong> {order.quantity}
                                            </div>
                                        )}

                                        <p className="text-gray-500 text-sm">
                                            Purchased on{" "}
                                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}
                                        </p>

                                        {!isAdmin && (
                                            <div className="flex flex-col gap-3 pt-3">
                                                <button
                                                    type="button"
                                                    onClick={() => handleUpdateOrder(order._id)}
                                                    disabled={processingOrderId === order._id}
                                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-60"
                                                >
                                                    {processingOrderId === order._id ? "Updating..." : "Update Quantity"}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCancelOrder(order._id)}
                                                    disabled={processingOrderId === order._id}
                                                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-60"
                                                >
                                                    {processingOrderId === order._id ? "Processing..." : "Cancel Order"}
                                                </button>
                                            </div>
                                        )}

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
