import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../../layout/Main/Main';
import ErrorPage from '../../pages/Shared/ErrorPage/ErrorPage';
import Home from '../../pages/Home/Home/Home';
import About from '../../pages/About/About';
import Blog from '../../pages/Blog/Blog';
import Categories from '../../pages/Categories/Categories';

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
                path: '/about',
                element: <About></About>,
            },
            {
                path: '/blog',
                element: <Blog></Blog>,
            },
            {
                path: '/categories',
                element: <Categories />,
            },
            {
                path: '/dashboard',
                element: <Categories />,
            },
        ]
    }
])
export default routes;