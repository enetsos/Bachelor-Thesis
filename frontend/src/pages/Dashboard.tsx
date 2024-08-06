import React from 'react';
import { useAuth } from '../context/LoginContext';
import { Navigate } from 'react-router-dom';
import { Role } from '../types';

const Dashboard: React.FC = () => {
    const { role } = useAuth();

    if (role === null) {
        return <Navigate to="/login" />;
    }

    if (role === Role.ADMIN) {
        return <Navigate to="/admin/" />;
    }

    if (role === Role.EMPLOYEE) {
        return <Navigate to="/employee/" />;
    }

    if (role === Role.SUPERVISOR) {
        return <Navigate to="/supervisor/" />;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
        </div>
    );
}
export default Dashboard;