import React, { useContext } from 'react';
import Spinner from '../../pages/Shared/Spinner/Spinner';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../../context/AuthContext/AuthProvider';

const PrivateRoutes = ({ children }) => {
    const { loading, user } = useContext(authContext);
    const location = useLocation();
    if (loading) {
        return <Spinner />;
    }
    if (user) {
        return children;
    }
    return (
        <Navigate to='/login' state={{ from: location }} replace></Navigate>
    );
};

export default PrivateRoutes;