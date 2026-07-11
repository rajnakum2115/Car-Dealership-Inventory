function VehicleCard({ vehicle }) {

    return (

        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

            <img
                src={`/images/${vehicle.image}`}
                alt={vehicle.name}
                className="w-full h-56 object-cover"
            />

            <div className="p-5">

                <h2 className="text-2xl font-bold text-gray-800">
                    {vehicle.name}
                </h2>

                <p className="text-gray-600 mt-2">
                    {vehicle.brand}
                </p>

                <p className="text-sm text-gray-500">
                    {vehicle.category}
                </p>

                <h3 className="text-blue-600 text-xl font-bold mt-3">
                    ₹ {vehicle.price.toLocaleString()}
                </h3>

                <button
                    className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                >
                    View Details
                </button>

            </div>

        </div>

    );

}

export default VehicleCard;