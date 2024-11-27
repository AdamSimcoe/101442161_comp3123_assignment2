// Created by Adam Simcoe - 101442161
// Last Updated - November 26th, 2024

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const EmployeeDetails = () => {
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/${id}`, {
                    withCredentials: true,
                });

                setEmployee(response.data);
            } catch (err) {
                setError("Error occured while fetching employee's data.");
            }
        };

        fetchEmployee();
    }, [id]);

    if (!employee) {
        return <div className="Loading-screen">Loading Employee Details...</div>;
    }

    return (
        <div className="employee-details-container">
            {error && <div className="error-message">{error}</div>}
            <h2>Employee Details</h2>
            <div className="employee-details-list">
                <div className="field-group">
                    <span className="field-label">Employee ID: </span>
                    <span>{employee._id}</span>
                </div>
                <div className="field-group">
                    <span className="field-label">Full Name: </span>
                    <span>{employee.first_name} {employee.last_name}</span>
                </div>
                <div className="field-group">
                    <span className="field-label">Email: </span>
                    <span>{employee.email}</span>
                </div>
                <div className="field-group">
                    <span className="field-label">position:</span>
                    <span>{employee.position}</span>
                </div>
                <div className="field-group">
                    <span className="field-label">salary: </span>
                    <span>{employee.salary}</span>
                </div>
                <div className="field-group">
                    <span className="field-label">Date of Joining: </span>
                    <span>{employee.date_of_joining}</span>
                </div>
                <div className="field-group">
                    <span className="field-label">Department: </span>
                    <span>{employee.department}</span>
                </div>
                <div className="field-group">
                    <span className="field-label">Created at: </span>
                    <span>{employee.created_at}</span>
                </div>
                <div className="field-group">
                    <span className="field-label">Updated at: </span>
                    <span>{employee.updated_at}</span>
                </div>
            </div>

            <button onClick={() => navigate('/employees')} className="cancel-button">Back</button>
        </div>
    );
};

export default EmployeeDetails;