import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../../layout/Main/Main';
import ErrorPage from '../../pages/Shared/ErrorPage/ErrorPage';
import Home from '../../pages/Home/Home/Home';
import About from '../../pages/About/About';
import Blog from '../../pages/Blog/Blog';
import CategoryBooks from '../../pages/CategoryBooks/CategoryBooks';
import Profile from '../../pages/Dashboard/Profile/Profile';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import AllBuyers from '../../pages/Dashboard/Admin/AllBuyers/AllBuyers';
import AllSeller from '../../pages/Dashboard/Admin/AllSeller/AllSeller';
import MyOrders from '../../pages/Dashboard/MyOrders/MyOrders';
import MyProducts from '../../pages/Dashboard/MyProducts/MyProducts';
import Login from '../../pages/Login/Login';
import Signup from '../../pages/Signup/Signup';
import Wishlist from '../../pages/Dashboard/Wishlist/Wishlist';
import AddProduct from '../../pages/Dashboard/AddProduct/AddProduct';
import MakePayment from '../../pages/Dashboard/MakePayment/MakePayment';

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
                path: '/signin',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard',
                element: <Profile />,
            },
            {
                path: '/dashboard/profile',
                element: <Profile />,
            },
            {
                path: '/dashboard/addproduct',
                element: <AddProduct />
            },
            {
                path: '/dashboard/mywishlist',
                element: <Wishlist />
            },
            {
                path: '/dashboard/allbuyers',
                element: <AllBuyers />
            },
            {
                path: '/dashboard/allsellers',
                element: <AllSeller />
            },
            {
                path: '/dashboard/myorders',
                element: <MyOrders />
            },
            {
                path: '/dashboard/myproducts',
                element: <MyProducts />
            },
            {
                path: '/dashboard/payment/:id',
                element: <MakePayment />,
                loader: ({ params }) => fetch(`http://localhost:5000/order/${params.id}`)
            }
        ]
    }
])
export default routes;