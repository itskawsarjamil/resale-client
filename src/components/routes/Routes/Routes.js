import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from '../../layout/Main/Main';
import ErrorPage from '../../pages/Shared/ErrorPage/ErrorPage';
import Home from '../../pages/Home/Home/Home';

const routes=createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
            },
            {
                path:'/home',
                element:<Home></Home>,
            },
        ]
    }
])
export default routes;