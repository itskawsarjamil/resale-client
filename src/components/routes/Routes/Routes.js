import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../../layout/Main/Main';
import ErrorPage from '../../pages/Shared/ErrorPage/ErrorPage';
import Home from '../../pages/Home/Home/Home';
import About from '../../pages/About/About';
import Blog from '../../pages/Blog/Blog';
import CategoryBooks from '../../pages/CategoryBooks/CategoryBooks';
import Dashboard from '../../pages/Dashboard/Dashboard/Dashboard';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/home',
                element: <Home></Home>,
            },
            {
                path: '/categorybooks/:id',
                element: <CategoryBooks></CategoryBooks>,
                loader: ({ params }) => fetch(`http://localhost:5000/CategoryBooks/${params.id}`),
            },
            {
                path: '/about',
                element: <About></About>,
            },
            {
                path: '/blog',
                element: <Blog></Blog>,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
        ]
    }
])
export default routes;