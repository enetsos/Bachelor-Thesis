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

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
        </div>
    );
}
export default Dashboard;