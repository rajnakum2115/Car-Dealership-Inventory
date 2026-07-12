function VehicleFilter({

    search,
    setSearch,

    category,
    setCategory,

    fuel,
    setFuel,

    sort,
    setSort

}) {

    return (

        <div className="bg-white shadow-lg rounded-xl p-6 mb-10">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                {/* Search */}

                <input
                    type="text"
                    placeholder="Search by Vehicle Name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Category */}

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded-lg p-3"
                >

                    <option value="All">All Categories</option>

                    <option value="SUV">SUV</option>

                    <option value="Sedan">Sedan</option>

                    <option value="Hatchback">Hatchback</option>

                    <option value="Luxury">Luxury</option>

                    <option value="Electric">Electric</option>

                    <option value="Sports">Sports</option>

                </select>

                {/* Fuel */}

                <select
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                    className="border rounded-lg p-3"
                >

                    <option value="All">All Fuel Types</option>

                    <option value="Petrol">Petrol</option>

                    <option value="Diesel">Diesel</option>

                    <option value="Electric">Electric</option>

                    <option value="Hybrid">Hybrid</option>

                </select>

                {/* Sort */}

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border rounded-lg p-3"
                >

                    <option value="">Sort By</option>

                    <option value="low">Price : Low → High</option>

                    <option value="high">Price : High → Low</option>

                </select>

            </div>

        </div>

    );

}

export default VehicleFilter;