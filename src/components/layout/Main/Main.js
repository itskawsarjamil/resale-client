import React from 'react';
import Nav from '../../pages/Shared/Nav/Nav';
import { Outlet } from 'react-router-dom';
import Footer from '../../pages/Shared/Footer/Footer';

const Main = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;