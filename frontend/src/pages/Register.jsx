import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

import { registerUser, loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Register() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await registerUser(formData);

            // After registration, automatically login the user and set auth state
            const loginResp = await loginUser({
                email: formData.email,
                password: formData.password
            });

            if (loginResp.token && loginResp.user) {
                login(loginResp.token, loginResp.user);
            }

            toast.success("Registration Successful — logged in");

            // Redirect to Home
            navigate("/");

        } catch (error) {

            toast.error(error.response?.data?.message || "Registration Failed");
        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex flex-col">

            <header className="px-6 py-6">
                <div className="flex items-center gap-3">
                    <img
                        src="/images/logo.jpg"
                        alt="CarDealer Logo"
                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 shadow-sm"
                    />
                    <span className="text-2xl font-bold text-slate-900">
                        CarDealer
                    </span>
                </div>
            </header>

            <div className="flex-1 flex justify-center items-center">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                    <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                        Create Account
                    </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-slate-500 hover:text-slate-800"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Register
                    </button>

                </form>

                <p className="mt-6 text-center text-gray-600">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-blue-600 ml-2 font-semibold hover:underline"
                    >
                        Login
                    </Link>

                </p>

                </div>

            </div>

        </div>

    );

}

export default Register;
