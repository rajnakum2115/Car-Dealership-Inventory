import { useState, useEffect } from "react";

// Delays a fast-changing value (e.g. a search input) so we only trigger the
// backend search after the user stops typing. Used by the Vehicles page to
// power Feature 10 (search from backend) without hammering the API.
const useDebounce = (value, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
