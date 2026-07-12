import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = await loginUser(formData);

            // Persist auth state via context (writes to localStorage too).
            login(data.token, data.user);

            toast.success("Login Successful");

            navigate("/home");

        } catch (error) {

            toast.error(error.response?.data?.message || "Login Failed");

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center">

            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                    >
                        Login
                    </button>

                </form>

                <p className="mt-6 text-center">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-600 ml-2 font-semibold hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;
