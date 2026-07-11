import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {

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

            console.log("Login Response:", data);

            // Save JWT token
            localStorage.setItem("token", data.token);

            // Save user data
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login Successful");

            // Reload application
            window.location.href = "/home";

        } catch (error) {

            alert(error.response?.data?.message || "Login Failed");

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