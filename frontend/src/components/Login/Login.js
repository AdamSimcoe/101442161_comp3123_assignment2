// Created by Adam Simcoe - 101442161 
// Last Updated - November 29th, 2024 

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles.css';

const Login = () => {

    // States for email, password, and error messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Navigation hook for redirecting
    const navigate = useNavigate();

    // Login form submission
    const handleLogin = async (e) => {
        
        // Prevent default form submit
        e.preventDefault();
        
        // Check to see if both fields are filled
        if (!email || !password) {
            setError('Please enter both a username and password.');
            return;
        }

        try {
            // POST request using user inputted email and password
            const response = await axios.post('http://localhost:5000/api/v1/user/login', {
                email, 
                password,
            });
            
            // Store token in localStorage
            const token = response.data.token;
            localStorage.setItem('token', token);

            // Set token as default authorization header for later requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Navigate to employee list page after success
            navigate('/employees');
        } catch (err) {
            setError('Invalid email or password.');
        }
    };

    // Signup Page redirect
    const redirectToSignup = () => {
        navigate('/signup')
    }

    return (
        <div className='login-container'>

            {/* Login Form */}
            <form onSubmit={handleLogin} className='login-form'>
                <h2>Login Form</h2>
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
                {/* Error message */}
                {error && <p className="error-message">{error}</p>}

                {/* Login Button */}
                <button type="submit">Login</button>

                {/* Signup Page Redirect */}
                <button type='button' onClick={redirectToSignup} className='redirect-button'>Create an Account</button>
            </form>
        </div>
    );
};

export default Login;