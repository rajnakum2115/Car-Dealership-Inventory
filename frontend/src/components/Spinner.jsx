// Reusable loading spinner (Feature 7). Replaces the old plain-text
// "Loading..." placeholders throughout the app.
function Spinner({ label = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            {label && (
                <p className="mt-4 text-gray-600 text-lg">{label}</p>
            )}
        </div>
    );
}

export default Spinner;
