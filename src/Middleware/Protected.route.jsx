import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const ProtectedRoutes = () => {
    const location = useLocation();

    let isAuthenticated = JSON.parse(secureLocalStorage.getItem("user_watch_list"));
    // 👇🏽 could be a check inside a global state, like a context
    if (isAuthenticated) {
        return <Outlet />;
    }

    return <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoutes;