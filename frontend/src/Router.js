// Created by Adam Simcoe - 101442161 
// Last Updated - November 26th, 2024 

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmployeeListPage from './pages/EmployeeListPage';
import AddEmployeePage from './pages/AddEmployeePage';
import EmployeeDetailsPage from './pages/EmployeeDetailsPage';
import UpdateEmployeePage from './pages/UpdateEmployeePage';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />}  />
                <Route path="/employees" element={<EmployeeListPage />} />
                <Route path="/employees/add" element={<AddEmployeePage />} />
                <Route path='/employees/update/:id' element={<UpdateEmployeePage />} />
                <Route path="/employees/:id" element={<EmployeeDetailsPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;