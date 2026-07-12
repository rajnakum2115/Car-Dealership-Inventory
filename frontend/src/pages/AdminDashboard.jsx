import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminVehicleTable from "../components/AdminVehicleTable";
import Spinner from "../components/Spinner";

import { getStats } from "../services/statsService";

function AdminDashboard() {

    const [stats, setStats] = useState(null);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {

        try {
            const data = await getStats();
            setStats(data);
        } catch (error) {
            toast.error("Failed to load dashboard stats");
        } finally {
            setLoadingStats(false);
        }

    };

    const statCards = [
        {
            label: "Total Vehicles",
            value: stats?.totalVehicles ?? "—",
            color: "bg-blue-600"
        },
        {
            label: "Total Users",
            value: stats?.totalUsers ?? "—",
            color: "bg-green-600"
        },
        {
            label: "Total Orders",
            value: stats?.totalOrders ?? "—",
            color: "bg-purple-600"
        },
        {
            label: "Out of Stock",
            value: stats?.outOfStock ?? "—",
            color: "bg-red-600"
        }
    ];

    return (

        <>

            <Navbar />

            <section className="bg-gray-100 min-h-screen py-12">

                <div className="max-w-7xl mx-auto px-6">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">

                        <h1 className="text-4xl font-bold">
                            Admin Dashboard
                        </h1>

                        <div className="flex gap-4">

                            <Link
                                to="/admin/orders"
                                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
                            >
                                View Orders
                            </Link>

                            <Link
                                to="/admin/add"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
                            >
                                Add Vehicle
                            </Link>

                        </div>

                    </div>

                    {/* Stats Cards (Feature 4) */}
                    {loadingStats ? (

                        <Spinner label="Loading stats..." />

                    ) : (

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                            {statCards.map((card) => (

                                <div
                                    key={card.label}
                                    className={`${card.color} text-white rounded-xl shadow-lg p-6`}
                                >
                                    <p className="text-sm font-medium opacity-90">{card.label}</p>
                                    <p className="text-4xl font-bold mt-2">{card.value}</p>
                                </div>

                            ))}

                        </div>

                    )}

                    {/* Vehicle Management Table */}
                    <h2 className="text-2xl font-bold mb-4">Manage Vehicles</h2>
                    <AdminVehicleTable />

                </div>

            </section>

            <Footer />

        </>

    );

}

export default AdminDashboard;