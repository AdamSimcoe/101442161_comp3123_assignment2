// Created by Adam Simcoe - 101442161
// Last Updated - November 26th, 2024

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./database/mongoDb');
const setupSampleUsers = require('./database/sampleUsers')
require('dotenv').config();

const app = express();

// CORS configuration for requests from front-end
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Initialize DB then run sample users data
connectDB()
    .then(async () => {
        console.log('Database connection established. Setting up sample user data.');
        await setupSampleUsers();
    })
    .catch(err => {
        console.error('Failed to connect to the database.', err);
        process.exit(1);
    });

app.use(express.json());

// User Route Path
app.use('/api/v1/user', require('./controllers/userController'));

// Employee Route Path
app.use('/api/v1/emp', require('./controllers/employeeController'));

// Set port, default set to 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});