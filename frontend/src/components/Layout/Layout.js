// Created by Adam Simcoe - 101442161
// Last Updated - November 29th, 2024

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

// Component to define page structure 
const Layout = () => {
    return (
        <>
            {/* NavBar at top of page */}
            <Navbar />

            {/* Rest of page content */}
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;