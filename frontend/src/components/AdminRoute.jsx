import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!user?.roles?.includes('ROLE_ADMIN')) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default AdminRoute;
