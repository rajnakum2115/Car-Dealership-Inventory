import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { createVehicle } from "../services/vehicleService";
import { parsePriceInput } from "../utils/price";

function AddVehicle() {

    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState({
        name: "",
        brand: "",
        category: "",
        fuel: "",
        transmission: "",
        year: "",
        price: "",
        quantity: "",
        description: ""
    });

    // Feature 5 — image file upload
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setVehicle({
            ...vehicle,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!imageFile) {
            toast.error("Please select an image");
            return;
        }

        setSubmitting(true);

        try {

            // Feature 5 — send as FormData for multipart upload
            const formData = new FormData();

            formData.append("name", vehicle.name);
            formData.append("brand", vehicle.brand);
            formData.append("category", vehicle.category);
            formData.append("fuel", vehicle.fuel);
            formData.append("transmission", vehicle.transmission);
            formData.append("year", vehicle.year);
            formData.append("price", parsePriceInput(vehicle.price));
            formData.append("quantity", vehicle.quantity);
            formData.append("description", vehicle.description);
            formData.append("image", imageFile);

            await createVehicle(formData);

            toast.success("Vehicle added successfully");

            navigate("/admin");

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to add vehicle");

        } finally {

            setSubmitting(false);

        }

    };

    return (

        <>

            <Navbar />

            <section className="bg-gray-100 min-h-screen py-12">

                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

                    <h1 className="text-4xl font-bold text-center mb-8">
                        Add Vehicle
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="grid md:grid-cols-2 gap-6"
                    >

                        <input
                            type="text"
                            name="name"
                            placeholder="Vehicle Name"
                            onChange={handleChange}
                            className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <input
                            type="text"
                            name="brand"
                            placeholder="Brand"
                            onChange={handleChange}
                            className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            onChange={handleChange}
                            className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <input
                            type="text"
                            name="fuel"
                            placeholder="Fuel"
                            onChange={handleChange}
                            className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <input
                            type="text"
                            name="transmission"
                            placeholder="Transmission"
                            onChange={handleChange}
                            className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <input
                            type="number"
                            name="year"
                            placeholder="Year"
                            onChange={handleChange}
                            className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <input
                            type="number"
                            name="price"
                            min="0"
                            step="1"
                            placeholder="Price"
                            onChange={handleChange}
                            className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            onChange={handleChange}
                            className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        {/* Feature 5 — Image file upload */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-medium mb-2">
                                Vehicle Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full border rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mt-4 w-48 h-32 object-cover rounded-lg border"
                                />
                            )}
                        </div>

                        <textarea
                            name="description"
                            rows="5"
                            placeholder="Vehicle Description"
                            onChange={handleChange}
                            className="border rounded-lg p-3 md:col-span-2 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg md:col-span-2 font-semibold transition disabled:opacity-50"
                        >
                            {submitting ? "Adding..." : "Add Vehicle"}
                        </button>

                    </form>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default AddVehicle;