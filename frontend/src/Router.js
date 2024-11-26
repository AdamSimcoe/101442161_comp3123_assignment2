// Created by Adam Simcoe - 101442161 
// Last Updated - November 25th, 2024 

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import EmployeeList from './pages/EmployeeListPage';
import AddEmployee from './pages/AddEmployeePage';
import EmployeeDetails from './pages/EmployeeDetailsPage';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />}  />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/add" element={<AddEmployee />} />
                <Route path="/employees/:id" element={<EmployeeDetails />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;