import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import api from "../services/api";

function ChangePassword() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        if (formData.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {

            await api.put("/users/password", {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });

            toast.success("Password updated successfully");

            navigate("/profile");

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to change password");

        } finally {

            setLoading(false);

        }

    };

    return (

        <>

            <Navbar />

            <section className="bg-gray-100 min-h-screen py-16">

                <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-10">

                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Change Password
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Current Password
                            </label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Update Password"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                        >
                            Back to Profile
                        </button>

                    </form>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default ChangePassword;
