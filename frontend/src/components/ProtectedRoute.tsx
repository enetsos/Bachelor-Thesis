import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/LoginContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
    const { role } = useAuth();

    if (role === null) {
        return <div>Loading...</div>; // O qualsiasi altro componente di caricamento
    }

    if (!requiredRoles.includes(role)) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
