// Created by Adam Simcoe - 101442161
// Last updated - November 29th, 2024

import React from "react";
import { Navigate } from "react-router-dom";

// Route protection for employee pages based on user authentication
const ProtectedRoute = ({ children }) => {
    // Get stored user token
    const token = localStorage.getItem('token');
    
    // If token exists, render all child components in Router.js. If not, redirect to login page
    return token ? children : <Navigate to='/' />;
};

export default ProtectedRoute;