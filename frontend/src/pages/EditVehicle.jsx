import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

import { getVehicleById, updateVehicle } from "../services/vehicleService";
import getImageSrc from "../utils/imageUrl";
import { parsePriceInput } from "../utils/price";

function EditVehicle() {

    const { id } = useParams();
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
        image: "",
        description: ""
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const _prevPrice = useRef(vehicle.price);

    useEffect(() => {
        if (_prevPrice.current !== vehicle.price) {
            console.log("[Vehicle Price] state change detected", { prev: _prevPrice.current, next: vehicle.price });
            console.trace();
            _prevPrice.current = vehicle.price;
        }
    }, [vehicle.price]);

    // Feature 5 — image file upload
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        fetchVehicle();
    }, []);

    const fetchVehicle = async () => {

        try {

            const data = await getVehicleById(id);
            setVehicle({
                ...data,
                price: parsePriceInput(data.price),
                quantity: data.quantity ?? "",
                year: data.year ?? ""
            });

        } catch (error) {

            toast.error("Failed to load vehicle");

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("[Vehicle] field change", { name, value, currentPrice: vehicle.price });

        setVehicle((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePriceChange = (e) => {
        const rawValue = e.target.value;
        const sanitizedValue = parsePriceInput(rawValue);

        console.log("[Vehicle Price] edit form input", { rawValue, sanitizedValue });

        setVehicle((prev) => ({
            ...prev,
            price: sanitizedValue
        }));
    };

    const handlePriceFocus = (e) => {
        console.log("[Vehicle Price] edit focus", { value: e.target.value });
    };

    const handlePriceBlur = (e) => {
        const raw = e.target.value;
        const sanitized = parsePriceInput(raw);
        console.log("[Vehicle Price] edit blur", { raw, sanitized });

        setVehicle((prev) => ({
            ...prev,
            price: sanitized
        }));
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

        setSubmitting(true);

        try {

            const price = parsePriceInput(vehicle.price);
            const quantity = Number(vehicle.quantity);
            const year = vehicle.year ? Number(vehicle.year) : undefined;

            console.log("[Vehicle Price] edit submit state", {
                rawPrice: vehicle.price,
                parsedPrice: price,
                quantity,
                year
            });

            // Feature 5 — if an image file was selected, send as FormData.
            // Otherwise send a JSON body so the existing image is preserved.
            let payload;

            if (imageFile) {

                payload = new FormData();
                payload.append("name", vehicle.name);
                payload.append("brand", vehicle.brand);
                payload.append("category", vehicle.category);
                payload.append("fuel", vehicle.fuel);
                payload.append("transmission", vehicle.transmission);
                payload.append("year", year ?? "");
                payload.append("price", price);
                payload.append("quantity", quantity);
                payload.append("description", vehicle.description);
                payload.append("image", imageFile);

            } else {

                payload = {
                    name: vehicle.name,
                    brand: vehicle.brand,
                    category: vehicle.category,
                    fuel: vehicle.fuel,
                    transmission: vehicle.transmission,
                    year,
                    price,
                    quantity,
                    description: vehicle.description
                };

            }

            await updateVehicle(id, payload);

            toast.success("Vehicle updated successfully");

            navigate("/admin");

        } catch (error) {

            toast.error(error.response?.data?.message || "Update failed");

        } finally {

            setSubmitting(false);

        }

    };

    if (loading) {
        return (
            <>
                <Navbar />
                <Spinner label="Loading vehicle..." />
                <Footer />
            </>
        );
    }

    return (

        <>

            <Navbar />

            <section className="bg-gray-100 min-h-screen py-12">

                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

                    <h1 className="text-4xl font-bold text-center mb-8">
                        Edit Vehicle
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="grid md:grid-cols-2 gap-6"
                    >

                        <input
                            type="text"
                            name="name"
                            value={vehicle.name}
                            onChange={handleChange}
                            placeholder="Vehicle Name"
                            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            name="brand"
                            value={vehicle.brand}
                            onChange={handleChange}
                            placeholder="Brand"
                            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            name="category"
                            value={vehicle.category}
                            onChange={handleChange}
                            placeholder="Category"
                            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            name="fuel"
                            value={vehicle.fuel}
                            onChange={handleChange}
                            placeholder="Fuel"
                            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            name="transmission"
                            value={vehicle.transmission}
                            onChange={handleChange}
                            placeholder="Transmission"
                            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="number"
                            name="year"
                            value={vehicle.year || ""}
                            onChange={handleChange}
                            placeholder="Year"
                            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="number"
                            name="price"
                            min="0"
                            step="1"
                            inputMode="numeric"
                            value={vehicle.price ?? ""}
                            onChange={handlePriceChange}
                            onFocus={handlePriceFocus}
                            onBlur={handlePriceBlur}
                            placeholder="Price"
                            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="number"
                            name="quantity"
                            value={vehicle.quantity}
                            onChange={handleChange}
                            placeholder="Quantity"
                            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Feature 5 — Image file upload with current preview */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-medium mb-2">
                                Vehicle Image
                            </label>

                            {/* Show current image */}
                            <div className="mb-3">
                                <img
                                    src={imagePreview || getImageSrc(vehicle.image)}
                                    alt="Current"
                                    className="w-48 h-32 object-cover rounded-lg border"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    {imageFile ? "New image selected" : "Current image"}
                                </p>
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full border rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>

                        <textarea
                            rows="5"
                            name="description"
                            value={vehicle.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="border p-3 rounded-lg md:col-span-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg md:col-span-2 font-semibold transition disabled:opacity-50"
                        >
                            {submitting ? "Updating..." : "Update Vehicle"}
                        </button>

                    </form>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default EditVehicle;