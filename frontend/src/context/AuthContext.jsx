import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Reads the persisted JWT + user object out of localStorage once, and keeps
// them in React state so login/logout updates the Navbar and route guards
// immediately — no more hard page reloads.
export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    // Called after a profile update so the Navbar reflects the new name.
    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    const isAdmin = user?.role === "admin";

    const value = {
        token,
        user,
        isAdmin,
        isAuthenticated: Boolean(token),
        login,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;
