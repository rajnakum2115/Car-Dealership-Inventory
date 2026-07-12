import { useState } from "react";

// Feature 9 — reusable restock modal with a number input.
// Replaces the old `prompt()` call in AdminVehicleTable.
function RestockModal({ vehicleName, onConfirm, onCancel }) {

    const [quantity, setQuantity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const num = Number(quantity);

        if (!num || num <= 0) return;

        onConfirm(num);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-4 animate-fade-in">

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Restock Vehicle
                </h2>

                <p className="text-gray-600 mb-6">
                    Enter the quantity to add for <strong>{vehicleName}</strong>.
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantity"
                        className="w-full border rounded-lg p-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />

                    <div className="flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                        >
                            Restock
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default RestockModal;
