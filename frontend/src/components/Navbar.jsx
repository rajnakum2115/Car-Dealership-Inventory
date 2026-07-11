import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

};

    return (

        <nav className="bg-slate-900 text-white flex justify-between items-center px-10 py-5">

            <h1 className="text-3xl font-bold">

                CarDealer

            </h1>

            <div className="flex items-center gap-8">

                <Link to="/">Home</Link>

                <Link to="/vehicles">Vehicles</Link>

                <Link to="/about">About</Link>

                <Link to="/contact">Contact</Link>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;