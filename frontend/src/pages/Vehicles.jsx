import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VehicleFilter from "../components/VehicleFilter";
import VehicleCard from "../components/VehicleCard";
import Spinner from "../components/Spinner";

import { searchVehicles } from "../services/vehicleService";
import useDebounce from "../hooks/useDebounce";

function Vehicles() {

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter state
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [fuel, setFuel] = useState("All");
    const [sort, setSort] = useState("");

    // Pagination state (Feature 6)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalVehicles, setTotalVehicles] = useState(0);
    const limit = 12;

    // Debounce the search input (Feature 10)
    const debouncedSearch = useDebounce(search, 300);

    // Build query params and fetch from backend (Feature 10)
    const fetchVehicles = useCallback(async () => {

        setLoading(true);

        try {

            const params = {
                page,
                limit,
                sort: sort || undefined
            };

            if (debouncedSearch) {
                params.name = debouncedSearch;
            }

            if (category && category !== "All") {
                params.category = category;
            }

            if (fuel && fuel !== "All") {
                params.fuel = fuel;
            }

            const data = await searchVehicles(params);

            setVehicles(data.vehicles);
            setTotalPages(data.totalPages);
            setTotalVehicles(data.totalVehicles);

        } catch (error) {

            toast.error("Failed to load vehicles");

        } finally {

            setLoading(false);

        }

    }, [page, limit, debouncedSearch, category, fuel, sort]);

    // Refetch when any filter, sort, or page changes
    useEffect(() => {
        fetchVehicles();
    }, [fetchVehicles]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, category, fuel, sort]);

    return (

        <>

            <Navbar />

            <section className="bg-gray-100 min-h-screen py-12">

                <div className="max-w-7xl mx-auto px-6">

                    <h1 className="text-5xl font-bold text-center mb-3">
                        Our Vehicles
                    </h1>

                    <p className="text-center text-gray-600 mb-10">
                        Find your perfect vehicle from our premium collection.
                    </p>

                    <VehicleFilter
                        search={search}
                        setSearch={setSearch}
                        category={category}
                        setCategory={setCategory}
                        fuel={fuel}
                        setFuel={setFuel}
                        sort={sort}
                        setSort={setSort}
                    />

                    {loading ? (

                        <Spinner label="Loading vehicles..." />

                    ) : vehicles.length === 0 ? (

                        <h2 className="text-center text-2xl font-semibold text-gray-500 py-16">
                            No Vehicles Found
                        </h2>

                    ) : (

                        <>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                                {vehicles.map((vehicle) => (

                                    <VehicleCard
                                        key={vehicle._id}
                                        vehicle={vehicle}
                                    />

                                ))}

                            </div>

                            {/* Feature 6 — Pagination Controls */}
                            {totalPages > 1 && (

                                <div className="flex justify-center items-center gap-4 mt-12">

                                    <button
                                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                        disabled={page === 1}
                                        className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        ← Prev
                                    </button>

                                    <span className="text-gray-700 font-medium">
                                        Page {page} of {totalPages}
                                        <span className="text-gray-400 ml-2">
                                            ({totalVehicles} total)
                                        </span>
                                    </span>

                                    <button
                                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                        disabled={page === totalPages}
                                        className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        Next →
                                    </button>

                                </div>

                            )}

                        </>

                    )}

                </div>

            </section>

            <Footer />

        </>

    );

}

export default Vehicles;