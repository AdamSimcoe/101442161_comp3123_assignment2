// Created by Adam Simcoe - 101442161 
// Last Updated - November 29th, 2024 

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles.css';

const Signup = () => {
    // States to store username, email, password, and errors
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Navigation hook for redirecting
    const navigate = useNavigate();

    // Signup Form submission
    const handleSignup = async (e) => {
        // Prevent default form submit
        e.preventDefault();
        
        // Check to see if all fields are filled
        if (!username || !email || !password) {
            setError('Please enter both a username and password.');
            return;
        }

        try {
            // POST request using user inputted username, email, and password
            const response = await axios.post('http://localhost:5000/api/v1/user/signup', {
                username, 
                email,
                password,
            });

            // Store token in localStorage
            localStorage.setItem('token', response.data.token);

            // Navigate to employee list page on success
            navigate('/employees');
        } catch (err) {
            setError('An error occured during signup, please try again.');
        }
    };

    // Redirect to login page
    const redirectToLogin = () => {
        navigate('/');
    }

    return (
        <div className='signup-container'>
            <form onSubmit={handleSignup} className='signup-form'>
                <h2>Signup Form</h2>

                {/* Signup Form */}
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {/* Error Message */}
                {error && <p className="error-message">{error}</p>}

                {/* Signup Button */}
                <button type="submit">Signup</button>

                {/* Login Page Redirect */}
                <button type='button' onClick={redirectToLogin} className='redirect-button'>Already have an account?</button>
            </form>
        </div>
    );
};

export default Signup;