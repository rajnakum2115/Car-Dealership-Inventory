// Feature 9 — reusable confirmation modal. Replaces window.confirm() and
// alert() throughout the admin flows.
function ConfirmModal({ title, message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-4 animate-fade-in">

                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    {title}
                </h2>

                <p className="text-gray-600 mb-8">
                    {message}
                </p>

                <div className="flex justify-end gap-4">

                    <button
                        onClick={onCancel}
                        className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                    >
                        Confirm
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ConfirmModal;
