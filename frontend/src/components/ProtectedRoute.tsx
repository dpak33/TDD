import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: React.ReactElement;
    isAuthenticated: boolean;
    path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, isAuthenticated, ...rest }) => {
    return isAuthenticated ? (
        <Route {...rest} element={element} />
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoute;
