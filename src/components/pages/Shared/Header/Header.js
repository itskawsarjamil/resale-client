import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../../../context/AuthContext/AuthProvider";
import logo from "../../../assets/logo/resalelogo.png";
import DropDown from "./DropDown";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useContext(authContext);
    // console.log(user);
    const handleLogOut = () => {
        logout()
            .then(() => {
                alert("sign out successfull");
            })
            .catch(er => { console.log(er) })
    }
    return (
        <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <div className="relative flex items-center justify-between">
                <Link
                    to="/"
                    aria-label="Resale"
                    title="Resale"
                    className="inline-flex items-center"
                >
                    <img className="w-10" src={logo} alt="logo" />
                    <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                        Resale
                    </span>
                </Link>
                <ul className="flex items-center hidden space-x-8 lg:flex">
                    <li>
                        <NavLink
                            to="/home"
                            aria-label="Home"
                            title="Home"
                            className={({ isActive }) => isActive ? "font-medium tracking-wide text-blue-700 transition-colors duration-200 hover:text-teal-400" : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-400"}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <DropDown></DropDown>
                        
                    </li>

                    <li>
                        <NavLink
                            to="/about"
                            aria-label="About us"
                            title="About us"
                            className={({ isActive }) => isActive ? "font-medium tracking-wide text-blue-700 transition-colors duration-200 hover:text-teal-400" : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-400"}
                        >
                            About us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/blog"
                            aria-label="blog"
                            title="blog"
                            className={({ isActive }) => isActive ? "font-medium tracking-wide text-blue-700 transition-colors duration-200 hover:text-teal-400" : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-400"}
                        >
                            Blog
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/addservice"
                            aria-label="Add Service"
                            title="Add Service"
                            className={({ isActive }) => isActive ? "font-medium tracking-wide text-blue-700 transition-colors duration-200 hover:text-teal-400" : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-400"}
                        >
                            Add Service
                        </NavLink>
                    </li>
                    {
                        (user && user.uid) ?
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard"
                                        aria-label="dashboard"
                                        title="dashboard"
                                        className={({ isActive }) => isActive ? "font-medium tracking-wide text-blue-700 transition-colors duration-200 hover:text-teal-400" : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-400"}
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <button onClick={handleLogOut} className="btn-ghost inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-400 hover:bg-teal-700 focus:shadow-outline focus:outline-none " aria-label="Log Out" title="Log Out">Log Out</button>
                                </li>
                            </>
                            :
                            <li>
                                <NavLink
                                    to="/signin"
                                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-400 hover:bg-teal-700 focus:shadow-outline focus:outline-none"
                                    aria-label="Sign in"
                                    title="Sign in"
                                >
                                    Sign in
                                </NavLink>
                            </li>
                    }


                </ul>
                <div className="lg:hidden">
                    <button
                        aria-label="Open Menu"
                        title="Open Menu"
                        className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-teal-50 focus:bg-deep-teal-50"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                            />
                            <path
                                fill="currentColor"
                                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                            />
                            <path
                                fill="currentColor"
                                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                            />
                        </svg>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute z-50 top-0 left-0 w-full">
                            <div className="p-5 bg-white border rounded shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <NavLink
                                            to="/"
                                            aria-label="Company"
                                            title="Company"
                                            className="inline-flex items-center"
                                        >
                                            <img className="w-10" src={logo} alt="logo" />
                                            <span className="ml-2 text-xl font-bold tracking-wide text-teal-800 uppercase">
                                                Resale
                                            </span>
                                        </NavLink>
                                    </div>
                                    <div>
                                        <button
                                            aria-label="Close Menu"
                                            title="Close Menu"
                                            className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <nav>
                                    <ul className="space-y-4">
                                        <li>
                                            <NavLink
                                                to="/home"
                                                aria-label="Home"
                                                title="Home"
                                                className={({ isActive }) => isActive ? "font-medium tracking-wide text-blue-700 transition-colors duration-200 hover:text-teal-400" : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-400"}
                                            >
                                                Home
                                            </NavLink>
                                        </li>
                                        <li>
                                            <DropDown></DropDown>
                                            
                                        </li>

                                        <li>
                                            <NavLink
                                                to="/about"
                                                aria-label="About us"
                                                title="About us"
                                                className={({ isActive }) => isActive ? "font-medium tracking-wide text-blue-700 transition-colors duration-200 hover:text-teal-400" : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-400"}
                                            >
                                                About us
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/blog"
                                                aria-label="blog"
                                                title="blog"
                                                className={({ isActive }) => isActive ? "font-medium tracking-wide text-blue-700 transition-colors duration-200 hover:text-teal-400" : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-400"}
                                            >
                                                Blog
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/addservice"
                                                aria-label="Add Service"
                                                title="Add Service"
                                                className={({ isActive }) => isActive ? "font-medium tracking-wide text-blue-700 transition-colors duration-200 hover:text-teal-400" : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-400"}
                                            >
                                                Add Service
                                            </NavLink>
                                        </li>
                                        {
                                            (user && user.uid) ?
                                                <>
                                                    <li>
                                                        <NavLink
                                                            to="/dashboard"
                                                            aria-label="dashboard"
                                                            title="dashboard"
                                                            className={({ isActive }) => isActive ? "font-medium tracking-wide text-blue-700 transition-colors duration-200 hover:text-teal-400" : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-400"}
                                                        >
                                                            Dashboard
                                                        </NavLink>
                                                    </li>

                                                    <li>
                                                        <button onClick={handleLogOut} className="btn-ghost inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-400 hover:bg-teal-700 focus:shadow-outline focus:outline-none " aria-label="Log Out" title="Log Out">Log Out</button>
                                                    </li>
                                                </>
                                                :
                                                <li>
                                                    <NavLink
                                                        to="/signin"
                                                        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-400 hover:bg-teal-700 focus:shadow-outline focus:outline-none"
                                                        aria-label="Sign in"
                                                        title="Sign in"
                                                    >
                                                        Sign in
                                                    </NavLink>
                                                </li>
                                        }


                                    </ul>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;