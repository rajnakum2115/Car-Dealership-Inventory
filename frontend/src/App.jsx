import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AddVehicle from "./pages/AddVehicle";
import EditVehicle from "./pages/EditVehicle";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/AdminOrders";

import { useAuth } from "./context/AuthContext";

// Wraps a page that requires a logged-in user.
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Wraps a page that requires an admin user (client-side guard; the backend
// enforces adminMiddleware independently).
const AdminRoute = ({ children }) => {
    const { isAuthenticated, isAdmin } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (!isAdmin) return <Navigate to="/" replace />;
    return children;
};

// Public-only pages (login/register) — redirect away if already logged in.
const GuestRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/" replace /> : children;
};

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />

                <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

                <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />

                <Route path="/vehicles" element={<ProtectedRoute><Vehicles /></ProtectedRoute>} />
                <Route path="/vehicles/:id" element={<ProtectedRoute><VehicleDetails /></ProtectedRoute>} />

                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/add" element={<AdminRoute><AddVehicle /></AdminRoute>} />
                <Route path="/admin/edit/:id" element={<AdminRoute><EditVehicle /></AdminRoute>} />
                <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />

                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

                <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />

                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;
