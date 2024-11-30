// Created by Adam Simcoe - 101442161
// Last updated - November 29th, 2024

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../styles.css';

const Navbar = () => {

    // Navigation hook for redirecting
    const navigate = useNavigate();

    // Logout Handling
    const handleLogout = () => {

        // Remove token from localStorage
        localStorage.removeItem('token');

        // Delete authorization header so user cannot send any more authenticated requests
        delete axios.defaults.headers.common['Authorization'];

        // Navigate to login page
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-links">
                {/* Button for Logout */}
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;