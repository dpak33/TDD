import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;