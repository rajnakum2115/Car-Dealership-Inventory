import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

import { FaUserCircle } from "react-icons/fa";

import { getProfile, updateProfile } from "../services/userService";
import { useAuth } from "../context/AuthContext";

function Profile() {

    const navigate = useNavigate();
    const { updateUser, logout } = useAuth();

    const [user, setUser] = useState({
        name: "",
        email: "",
        role: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        try {

            const data = await getProfile();
            setUser(data);

        } catch (error) {

            toast.error("Failed to load profile");

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const updatedUser = await updateProfile({
                name: user.name
            });

            // Update the AuthContext so Navbar reflects the new name.
            updateUser(updatedUser);

            toast.success("Profile updated successfully");

        } catch (error) {

            toast.error(error.response?.data?.message || "Update failed");

        }

    };

    const handleLogout = () => {
        logout();
        toast.info("Logged out successfully");
        navigate("/login");
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <Spinner label="Loading profile..." />
                <Footer />
            </>
        );
    }

    return (

        <>

            <Navbar />

            <section className="bg-gray-100 min-h-screen py-16">

                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-10">

                    <div className="flex flex-col items-center">

                        <FaUserCircle
                            size={120}
                            className="text-blue-600"
                        />

                        <h1 className="text-4xl font-bold mt-5">
                            My Profile
                        </h1>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-10 space-y-6"
                    >

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                value={user.email}
                                readOnly
                                className="w-full border rounded-lg p-3 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Role</label>
                            <input
                                value={user.role}
                                readOnly
                                className="w-full border rounded-lg p-3 bg-gray-100"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                        >
                            Save Changes
                        </button>

                    </form>

                    {/* Feature 1 — Change Password link */}
                    <div className="mt-6 flex gap-4">

                        <button
                            onClick={() => navigate("/change-password")}
                            className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                        >
                            Change Password
                        </button>

                        <button
                            onClick={handleLogout}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default Profile;