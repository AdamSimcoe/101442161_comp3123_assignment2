// Created by Adam Simcoe - 101442161
// Last Updated - October 9th, 2024

const { process_params } = require('express/lib/router');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Grab MongoDB URI from environment variable
const uri = process.env.MONGO_URI;

if (!uri) {
    console.error('MONGO URI not defined in environment variables.');
    process.exit(1);
}

// Create new MongoClient instance and initialize db
const client = new MongoClient(uri);
let db;

// Connect to the DB
const connectDB = async () => {
    if (db) return db;

    try {
        await client.connect();
        db = client.db(process.env.DB_NAME || 'comp3123_assignment2');
        console.log('Connected to MongoDB successfully!');
        return db;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
};

// Get initialized DB
const getDB = async () => {
    if (!db) {
        await connectDB();
    }
    return db;
};

module.exports = {connectDB, getDB};