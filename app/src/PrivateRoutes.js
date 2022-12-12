import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// Tokens Setup
import useToken from "./helpers/useToken";

const PrivateRoutes = () => {
    const { token } = useToken();
    return token ? (
        <Outlet />
    ) : (
        <Navigate to="/sign-in" />
    );
};

export default PrivateRoutes;
