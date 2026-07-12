// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// import { loginUser } from "../services/authService";
// import { useAuth } from "../context/AuthContext";

// function Login() {

//     const navigate = useNavigate();
//     const { login } = useAuth();

//     const [formData, setFormData] = useState({
//         email: "",
//         password: ""
//     });

//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });

//     };

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {

//             const data = await loginUser(formData);

//             // Persist auth state via context (writes to localStorage too).
//             login(data.token, data.user);

//             toast.success("Login Successful");

//             navigate("/home");

//         } catch (error) {

//             toast.error(error.response?.data?.message || "Login Failed");

//         }

//     };

//     return (

//         <div className="min-h-screen bg-slate-100 flex flex-col">

//             <header className="px-6 py-6">
//                 <div className="flex items-center gap-3">
//                     <img
//                         src="/images/logo.jpg"
//                         alt="CarDealer Logo"
//                         className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 shadow-sm"
//                     />
//                     <span className="text-2xl font-bold text-slate-900">
//                         CarDealer
//                     </span>
//                 </div>
//             </header>

//             <div className="flex-1 flex justify-center items-center">
//                 <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

//                     <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
//                         Login
//                     </h1>

//                 <form
//                     onSubmit={handleSubmit}
//                     className="space-y-5"
//                 >

//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     />

//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     />

//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//                     >
//                         Login
//                     </button>

//                 </form>

//                 <p className="mt-6 text-center">

//                     Don't have an account?

//                     <Link
//                         to="/register"
//                         className="text-blue-600 ml-2 font-semibold hover:underline"
//                     >
//                         Register
//                     </Link>

//                 </p>

//             </div>

//         </div>

//     );

// }

// export default Login;





import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

import { loginUser, resetPassword } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [resetForm, setResetForm] = useState({
        email: "",
        newPassword: ""
    });
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

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

            // Save user in Auth Context
            login(data.token, data.user);

            toast.success("Login Successful");

            navigate("/home");

        } catch (error) {

            toast.error(error.response?.data?.message || "Login Failed");

        }

    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            setIsResetting(true);
            await resetPassword(resetForm);
            toast.success("Password reset successfully. Please login with your new password.");
            setResetForm({ email: "", newPassword: "" });
            setShowResetPassword(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Password reset failed");
        } finally {
            setIsResetting(false);
        }
    };

    return (

        <div className="min-h-screen bg-slate-100 flex flex-col">

            {/* Header */}
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

            {/* Login Form */}
            <div className="flex-1 flex justify-center items-center">

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

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                                required
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
                            Login
                        </button>

                    </form>

                    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <button
                            type="button"
                            className="w-full text-left font-semibold text-blue-600 hover:text-blue-800"
                            onClick={() => setShowResetPassword((prev) => !prev)}
                        >
                            {showResetPassword ? "Hide password reset" : "Forgot password? Reset here"}
                        </button>

                        {showResetPassword && (
                            <form onSubmit={handleResetPassword} className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Registered email"
                                        value={resetForm.email}
                                        onChange={(e) => setResetForm({
                                            ...resetForm,
                                            [e.target.name]: e.target.value
                                        })}
                                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-slate-700">
                                        New Password
                                    </label>
                                    <input
                                        type={showResetPassword ? "text" : "password"}
                                        name="newPassword"
                                        placeholder="New password"
                                        value={resetForm.newPassword}
                                        onChange={(e) => setResetForm({
                                            ...resetForm,
                                            [e.target.name]: e.target.value
                                        })}
                                        className="w-full border rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowResetPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-slate-500 hover:text-slate-800"
                                        aria-label={showResetPassword ? "Hide password" : "Show password"}
                                    >
                                        {showResetPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isResetting}
                                    className="w-full bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
                                >
                                    {isResetting ? "Resetting password..." : "Reset Password"}
                                </button>
                            </form>
                        )}
                    </div>

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

        </div>

    );

}

export default Login;