// Created by Adam Simcoe - 101442161 
// Last Updated - November 26th, 2024

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/emp/employees', {
                    withCredentials: true,
                });

                setEmployees(response.data);
            } catch (err) {
                setError("Error occured while fetching employee list.");
            }
        };

        fetchAllEmployees();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/v1/emp/employees/${id}`, {
                withCredentials:true,
            });

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

            <button onClick={() => navigate('/employees/add')} className='add-employee-button'>Add Employee</button>

            <table className='employee-list-table'>
                <thead>
                    <tr>
                        <th>Full Name</th>
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