// Created by Adam Simcoe - 101442161 
// Last Updated - November 29th, 2024

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles.css';

const EmployeeList = () => {
    // States to store employees, errors, search queries
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');
    const [searchPosition, setSearchPosition] = useState('');
    const [searchDepartment, setSearchDepartment] = useState('');
    
    // Navigation hook for redirecting
    const navigate = useNavigate();

    // Fetch all employees as soon as component loads
    useEffect(() => {
        fetchAllEmployees();
    }, []); // Only runs once

    // Fetch all employees from database function, with optional search query
    const fetchAllEmployees = async (query = '') => {
        try {
            // GET request with optional search query
            const response = await axios.get(`http://localhost:5000/api/v1/emp/employees${query}`, {
                withCredentials: true,
            });

            // Update state with employee data from GET request
            setEmployees(response.data);

            // Reset error message on success
            setError(null);
        } catch (err) {
            // Check if search query returns no matches
            if (err.response.status === 404) {
                setError('No employees could be found matching your search criteria.');
            } else {
                setError("Error occured while fetching employee list.");
            }
        }
    };

    // Search function using position and department fields
    const handleSearch = () => {
        // Query URL
        let query = `/search?`;

        // Append filters based on user input
        if (searchPosition) query += `position=${searchPosition}&`;
        if (searchDepartment) query += `department=${searchDepartment}&`;

        // Fetch employees based on search criteria
        fetchAllEmployees(query);
    }

    // Delete function based off employee ID
    const handleDelete = async (id) => {
        try {
            // DEL request using ID
            const response = await axios.delete(`http://localhost:5000/api/v1/emp/employees/${id}`, {
                withCredentials:true,
            });

            // Check if delete succeeds, then removes deleted employee from state
            if (response.status === 200) {
                setEmployees(employees.filter(employee => employee._id !== id));
            }
        } catch (err) {
            setError("Error occured while deleting employee.");
        }
    };

    return (
        <div className='employee-list-container'>
            <h2>Employee List</h2>
            {error && <p className='error-message'>{error}</p>}

            {/* Search Container */}
            <div className='search-container'>
                <input 
                    type='text'
                    placeholder='Search by Position'
                    value={searchPosition}
                    onChange={(e) => setSearchPosition(e.target.value)}
                />
                <input 
                    type='text'
                    placeholder='Search by Department'
                    value={searchDepartment}
                    onChange={(e) => setSearchDepartment(e.target.value)}
                />
                
                {/* Search Buttons */}
                <button onClick={handleSearch} className='search-button'>Search</button>
                <button onClick={() => fetchAllEmployees()} className='clear-button'>Clear</button>
            </div>

            {/* Add Employee Button */}
            <button onClick={() => navigate('/employees/add')} className='add-employee-button'>Add Employee</button>

            {/* Employee List Table */}
            <table className='employee-list-table'>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Employee ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map(employee => (
                            <tr key={employee._id}>
                                <td>{employee.first_name} {employee.last_name}</td>
                                <td>{employee.position}</td>
                                <td>{employee.department}</td>
                                <td>{employee._id}</td>
                                <td>
                                    <button onClick={() => navigate(`/employees/${employee._id}`)} className='view-button'>View Details</button>
                                    <button onClick={() => navigate(`/employees/update/${employee._id}`)} className='update-button'>Update Employee</button>
                                    <button onClick={() => handleDelete(employee._id)} className='delete-button'>Delete Employee</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>No employees found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;