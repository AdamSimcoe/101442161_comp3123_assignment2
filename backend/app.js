// Created by Adam Simcoe - 101442161
// Last Updated - October 10th, 2024

const express = require('express');
const { connectDB } = require('./database/mongoDb');
const setupSampleUsers = require('./database/sampleUsers')
require('dotenv').config();

const app = express();

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