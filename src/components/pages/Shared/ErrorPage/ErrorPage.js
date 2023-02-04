import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div>
            <h2>{error}</h2>
        </div>
    );
};

export default ErrorPage;