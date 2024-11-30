// Created by Adam Simcoe - 101442161 
// Last Updated - November 29th, 2024 

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmployeeListPage from './pages/EmployeeListPage';
import AddEmployeePage from './pages/AddEmployeePage';
import EmployeeDetailsPage from './pages/EmployeeDetailsPage';
import UpdateEmployeePage from './pages/UpdateEmployeePage';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                { /* Route Pathing for Pages */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />}  />

                {/* Incase employee routing behind our protected route based off user authentication*/}
                <Route element={<Layout />}>
                    <Route
                        path='/employees'
                        element={
                            <ProtectedRoute>
                                <EmployeeListPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/employees/add'
                        element={
                            <ProtectedRoute>
                                <AddEmployeePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/employees/update/:id'
                        element={
                            <ProtectedRoute>
                                <UpdateEmployeePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/employees/:id'
                        element={
                            <ProtectedRoute>
                                <EmployeeDetailsPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;