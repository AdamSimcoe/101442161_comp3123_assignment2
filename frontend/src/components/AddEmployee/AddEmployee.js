// Created by Adam Simcoe - 101442161 
// Last Updated - November 29th, 2024

import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../../styles.css';

const AddEmployee = () => {

    // State for storing form data of new employee
    const [employeeData, setEmployeeData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: '',
    });
    
    // States for success and error messages
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState('');

    // Navigation hook for redirecting
    const navigate = useNavigate();

    // Input field change handler
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update field in the employee data state
        setEmployeeData((prevData) => ({ ...prevData, [name] : value }));
    };

    // Form Submission
    const handleAdd = async (e) => {
        // Stop default form from being submitted
        e.preventDefault();

        // Reset success and error messages
        setResponseMessage('');
        setError('');

        try {
            // POST request using user inputted employee data
            const response = await axios.post('http://localhost:5000/api/v1/emp/employees', employeeData, {
                withCredentials: true,
            });

            // Update success message, and provide default message for success
            setResponseMessage(response.data.message || "Employee added successfully.");

            // Reset all form fields after success
            setEmployeeData({
                first_name: '',
                last_name: '',
                email: '',
                position: '',
                salary: '',
                date_of_joining: '',
                department: '',
            });
        } catch (err) {
            setError(err.response?.data?.message || "An error has occured while adding the employee.");
        }
    };

    // Navigate back to employees list page if canceled
    const handleCancel = () => {
        navigate('/employees');
    };

    return (
        <div className="add-employee-container">
            <h2>Add New Employee</h2>

            {/* Add Employee Form */}
            <form onSubmit={handleAdd} className="add-employee-form">
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={employeeData.first_name}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                     />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={employeeData.last_name}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={employeeData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <input
                        type="text"
                        name="position"
                        value={employeeData.position}
                        onChange={handleChange}
                        placeholder="Position"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Salary</label>
                    <input
                        type="number"
                        name="salary"
                        value={employeeData.salary}
                        onChange={handleChange}
                        placeholder="Salary"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date_of_joining">Date of Joining</label>
                    <input
                        type="date"
                        name="date_of_joining"
                        value={employeeData.date_of_joining}
                        onChange={handleChange}
                        placeholder="Date of Joining"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <input
                        type="text"
                        name="department"
                        value={employeeData.department}
                        onChange={handleChange}
                        placeholder="Department"
                        required
                    />
                </div>

                {/* Success and Error Messages Section */}
                {error && <p className="error-message">{error}</p>}
                {responseMessage && <p className="success-message">{responseMessage}</p>}

                {/* Add Employee and Cancel Buttons */}
                <div className="form-actions">
                    <button type="submit" className="submit-button">Add Employee</button>
                    <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;