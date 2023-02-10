import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DropDown = ({ setIsMenuOpen }) => {

    const [isActive, setIsActive] = useState(false);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('https://resale-server-murex.vercel.app/Categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, []);

    const handleOnClick = () => {
        setIsActive(!isActive);
        setIsMenuOpen(curr => !curr);
    }

    return (
        <div>

            <div className="relative inline-block text-left">
                <div>
                    <button onClick={() => setIsActive(!isActive)} type="button" className=" bg-white flex items-center justify-center w-full rounded-md  pr-4 lg:pl-4 py-2 text-sm font-medium text-gray-700 hover:text-teal-400   " id="options-menu">
                        Books
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z">
                            </path>
                        </svg>
                    </button>
                </div>
                {
                    isActive &&
                    <div className="absolute z-10 left-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg  ring-1 ring-black ring-opacity-5">
                        <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {
                                categories.map(category => (
                                    <Link onClick={handleOnClick} key={category._id} to={`/categorybooks/${category._id}`} className=" block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 " role="menuitem">
                                        <span className="flex flex-col">
                                            <span>
                                                {category.category_name}
                                            </span>
                                        </span>
                                    </Link>
                                ))
                            }

                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default DropDown;