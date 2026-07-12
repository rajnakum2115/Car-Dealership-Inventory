import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getVehicles, deleteVehicle, restockVehicle } from "../services/vehicleService";
import getImageSrc from "../utils/imageUrl";
import { formatINR } from "../utils/price";
import ConfirmModal from "./ConfirmModal";
import RestockModal from "./RestockModal";
import Spinner from "./Spinner";

function AdminVehicleTable() {

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Feature 9 — modal state
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [restockTarget, setRestockTarget] = useState(null);

    useEffect(() => {

        fetchVehicles();

    }, []);

    const fetchVehicles = async () => {

        try {

            const data = await getVehicles();

            setVehicles(data);

        } catch (error) {

            toast.error("Failed to load vehicles");

        } finally {

            setLoading(false);

        }

    };

    // Feature 9 — confirm delete via modal
    const handleDeleteConfirm = async () => {

        if (!deleteTarget) return;

        try {

            await deleteVehicle(deleteTarget);

            toast.success("Vehicle deleted successfully");

            fetchVehicles();

        } catch (error) {

            toast.error(error.response?.data?.message || "Delete failed");

        } finally {

            setDeleteTarget(null);

        }

    };

    // Feature 9 — restock via modal
    const handleRestockConfirm = async (quantity) => {

        if (!restockTarget) return;

        try {

            await restockVehicle(restockTarget, quantity);

            toast.success("Vehicle restocked successfully");

            fetchVehicles();

        } catch (error) {

            toast.error(error.response?.data?.message || "Restock failed");

        } finally {

            setRestockTarget(null);

        }

    };

    if (loading) {
        return <Spinner label="Loading vehicles..." />;
    }

    return (

        <>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-900 text-white">

                        <tr>

                            <th className="p-4">Image</th>

                            <th>Name</th>

                            <th>Brand</th>

                            <th>Category</th>

                            <th>Price</th>

                            <th>Quantity</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            vehicles.map((vehicle) => (

                                <tr
                                    key={vehicle._id}
                                    className="text-center border-b hover:bg-gray-50 transition"
                                >

                                    <td className="py-4">

                                        <img
                                            src={getImageSrc(vehicle.image)}
                                            alt={vehicle.name}
                                            className="w-20 h-14 object-cover rounded mx-auto"
                                        />

                                    </td>

                                    <td>{vehicle.name}</td>

                                    <td>{vehicle.brand}</td>

                                    <td>{vehicle.category}</td>

                                    <td>

                                        ₹ {formatINR(vehicle.price)}

                                    </td>

                                    <td>{vehicle.quantity}</td>

                                    <td>

                                        <button
                                            onClick={() => navigate(`/admin/edit/${vehicle._id}`)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded mr-2 transition"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => setDeleteTarget(vehicle._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded mr-2 transition"
                                        >
                                            Delete
                                        </button>

                                        <button
                                            onClick={() => setRestockTarget(vehicle._id)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition"
                                        >
                                            Restock
                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

            {/* Feature 9 — Confirm Delete Modal */}
            {deleteTarget && (
                <ConfirmModal
                    title="Delete Vehicle"
                    message="Are you sure you want to delete this vehicle? This action cannot be undone."
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}

            {/* Feature 9 — Restock Modal */}
            {restockTarget && (
                <RestockModal
                    vehicleName={vehicles.find(v => v._id === restockTarget)?.name || "this vehicle"}
                    onConfirm={handleRestockConfirm}
                    onCancel={() => setRestockTarget(null)}
                />
            )}

        </>

    );

}

export default AdminVehicleTable;