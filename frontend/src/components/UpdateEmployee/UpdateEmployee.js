// Created by Adam Simcoe - 101442161
// Last Updated - November 26th, 2024

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmployee = () => {
    const [employeeData, setEmployeeData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: '',
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/${id}`);
                setEmployeeData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "An error has occured while fetching the employee's data.");
            }
        };
        fetchEmployeeData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({ ...prevData, [name] : value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setResponseMessage('');
        setError('');

        try {
            const response = await axios.put(`http://localhost:5000/api/v1/emp/employees/${id}`, employeeData, {
                withCredentials: true,
            });

            setResponseMessage(response.data.message || "Employee updated successfully.");

            setTimeout(() => navigate('/employees'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "An error has occured while updating the employee.");
        }
    };

    const handleCancel = () => {
        navigate('/employees');
    };

    return (
        <div className="update-employee-container">
            <h2>Update Employee</h2>
            <form onSubmit={handleUpdate} className="update-employee-form">
            
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

                {error && <p className="error-message">{error}</p>}
                {responseMessage && <p className="success-message">{responseMessage}</p>}

                <div className="form-actions">
                    <button type="submit" className="submit-button">Update Employee</button>
                    <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEmployee;