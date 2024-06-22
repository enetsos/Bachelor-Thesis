import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/LoginContext';
import { Role } from '../types';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: Role;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const { role } = useAuth();

    if (role === null) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/login" />;
    }


    return <>{children}</>;
};

export default ProtectedRoute;
