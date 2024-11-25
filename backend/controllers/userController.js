// Created by Adam Simcoe - 101442161
// Last Updated - October 9th, 2024

const express = require('express');
const { getDB } = require('../database/mongoDb');
const bcrypt = require('bcryptjs');
const router = express.Router();

// POST /api/v1/user/signup
router.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;

    // Check to ensure no field is left empty
    if (!username || !email || !password) {
        return res.status(400).json({message: 'All fields must be filled.'});
    }

    try {
        const db = await getDB();
        
        // Check to see if a user with this email already exists
        const existingUser = await db.collection('users').findOne({email});

        if (existingUser) {
            return res.status(400).json({message: 'User with this email already exists. Please choose a different email.'});
        }

        // Hash user's password using bcryptjs
        const passwordHashed = await bcrypt.hash(password, 10);

        // Insert new user into DB
        const result = await db.collection('users').insertOne({
            username, 
            email,
            password: passwordHashed,
            created_at: new Date(),
            updated_at: new Date(),
        });

        //Return success status code
        res.status(201).json({message: 'User was created successfully.', user_id: result.insertedId});
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({message: 'Server error.'});
    }
});

// POST /api/v1/user/login
// For sample user testing, please refer to sampleUsers.js for credentials
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    // Check to ensure no field is left empty
    if (!email || !password) {
        return res.status(400).json({message: 'Email and password fields must both be filled.'});
    }

    try {
        const db = await getDB();
    
        // Check to see user's email is correct
        const emailMatch = await db.collection('users').findOne({email})

        if (!emailMatch) {
            return res.status(400).json({message: 'Invalid email or password, please try again.'});
        }

        // Check to see if user's password is correct
        const passwordMatch = await bcrypt.compare(password, emailMatch.password);

        if (!passwordMatch) {
            return res.status(400).json({message: 'Invalid email or password, please try again.'});
        }

        // Return success status code
        res.status(200).json({message: 'Login was successful.'});
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({message: 'Server error.'});
    }
});

module.exports = router;