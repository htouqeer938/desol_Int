import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Private Routes
import PrivateRoutes from "./PrivateRoutes";

// Route Components
import SignIn from "./components/Signin";
import Dashboard from "./components/Dashboard";
// Tokens Setup
import useToken from "./helpers/useToken";

const Routers = () => {
    const { setToken } = useToken();
    return (
        <Router>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route element={<Dashboard />} path="/" exact />
                </Route>
                <Route
                    element={<SignIn setToken={setToken} />}
                    path="/sign-in"
                />
            </Routes>
        </Router>
    );
};

export default Routers;
