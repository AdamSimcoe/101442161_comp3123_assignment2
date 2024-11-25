// Created by Adam Simcoe - 101442161
// Last Updated - October 10th, 2024

const express = require('express');
const { getDB } = require('../database/mongoDb');
const { ObjectId } = require('mongodb');
const router = express.Router();

// POST /api/v1/emp/employees
router.post('/employees', async (req, res) => {
    const {first_name, last_name, email, position, salary, date_of_joining, department} = req.body;

    // Check to ensure no field is left empty
    if (!first_name || !last_name || !email || !position || !salary || !date_of_joining || !department) {
        return res.status(400).json({message: 'All fields must be filled.'});
    }

    try {
        const db = await getDB();

        // Insert new employee
        const result = await db.collection('employees').insertOne({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
            created_at: new Date(),
            updated_at: new Date()
        });

        // Return success status code
        res.status(201).json({message: 'Employee was created successfully.', employee_id: result.insertedId});
    } catch (err) {
        console.error('Error creating employee:', err);
        res.status(500).json({message:'Server error.'});
    }
});

// GET /api/v1/emp/employees/{id?}
router.get('/employees/:id?', async (req, res) => {
    const {id} = req.params;

    try {
        const db = await getDB();

        // Check to see if ID was provided
        if (id) {
            const employeeId = new ObjectId(id);
            const employee = await db.collection('employees').findOne({_id: employeeId});

            // Check to see if employee with that ID exists
            if (!employee) {
                return res.status(404).json({message: `Employeee with the ID ${id} not found.`});
            }

            // Return success status code
            return res.status(200).json(employee);
        }

        // Proceed if no ID is provided
        const employeesList = await db.collection('employees').find().toArray();

        // Check for if employee list is empty
        if (employeesList.length === 0) {
            return res.status(404).json({message: 'No employees were found.'});
        }

        // Return success status code
        res.status(200).json(employeesList);
    } catch (err) {
        console.error('Error finding employee list:', err);
        res.status(500).json({message: 'Server error.'});
    }
});

// PUT /api/v1/emp/employees/{id}
router.put('/employees/:id', async (req, res) => {
    const {id} = req.params;
    const {first_name, last_name, email, position, salary, date_of_joining, department} = req.body;

    // Check to ensure no field is left empty
    if (!first_name || !last_name || !email || !position || !salary || !date_of_joining || !department) {
        return res.status(400).json({message: 'All fields must be filled.'});
    }

    try {
        const db = await getDB();

        // Update fields of matching employee ID
        const employeeId = new ObjectId(id);
        const result = await db.collection('employees').updateOne(
            {_id: employeeId},
            {$set: {
                first_name, 
                last_name,
                email, 
                position, 
                salary, 
                date_of_joining,
                department,
                updated_at: new Date()}
            }
        );

        // Check to see if employeee with provided ID exists
        if (result.matchedCount === 0) {
            return res.status(404).json({message: 'Employee was not found.'});
        }

        // Return success status code
        res.status(200).json({message: 'Employee was updated successfully.'});
    } catch (err) {
        console.error('Error updating employee:', err);
        res.status(500).json({message: 'Server error.'});
    }
});

// DELETE /api/v1/emp/employees/{id}
router.delete('/employees/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const db = await getDB();
        
        // Delete all fields matching employee ID
        const employeeId = new ObjectId(id);
        const result = await db.collection('employees').deleteOne({_id: employeeId});

        // Check to see if employee with provided ID exists
        if (result.deletedCount === 0) {
            return res.status(404).json({message: 'Employee was not found.'});
        }

        // Return success status code
        res.status(200).json({message: 'Employee was deleted successfully.'});
    } catch (err) {
        console.error('Error deleting employee:', err);
        res.status(500).json({message: 'Server error.'});
    }
});

module.exports = router;