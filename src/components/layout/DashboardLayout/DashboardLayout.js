import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../pages/Dashboard/Sidebar/Sidebar';

const DashboardLayout = () => {
    return (
        <div >
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-start">
                    <div className="w-full navbar bg-base-300 lg:hidden">
                        <div className="flex-none ">
                            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                    </div>
                    
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu w-80 bg-base-100 text-base-content">
                        
                        <Sidebar></Sidebar>
                    </ul>

                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;


