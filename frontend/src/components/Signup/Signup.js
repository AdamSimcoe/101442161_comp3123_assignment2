// Created by Adam Simcoe - 101442161 
// Last Updated - November 25th, 2024 

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        
        // Check to see if all fields are filled
        if (!username || !email || !password) {
            setError('Please enter both a username and password.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/signup', {
                username, 
                email,
                password,
            });

            localStorage.setItem('token', response.data.token);
            navigate('/employees');
        } catch (err) {
            setError('An error occured during signup, please try again.');
        }
    };

    return (
        <div className='signup-container'>
            <form onSubmit={handleSignup} className='signup-form'>
                <h2>Login Form</h2>
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
                {error && <p className="error-message">{error}</p>}

                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;