import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { isAuthenticated, isAdmin } = useAuth();

    // Hide the navbar links on auth pages — Login/Register render their own
    // full-screen layout without a navbar.
    if (!isAuthenticated) {
        return null;
    }

    return (

        <nav className="bg-slate-900 text-white flex justify-between items-center px-10 py-4">

            <div className="flex items-center gap-3">

                <img
                    src="/images/logo.jpg"
                    alt="CarDealer Logo"
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                />

                <h1 className="text-4xl font-bold">
                    CarDealer
                </h1>

            </div>

            <div className="flex items-center gap-8">

                <Link to="/">Home</Link>

                <Link to="/vehicles">Vehicles</Link>

                <Link to="/about">About</Link>

                <Link to="/contact">Contact</Link>

                <Link to="/orders">My Orders</Link>

                {isAdmin && (
                    <Link to="/admin">Admin</Link>
                )}

                <Link to="/profile">Profile</Link>

            </div>

        </nav>

    );

}

export default Navbar;
