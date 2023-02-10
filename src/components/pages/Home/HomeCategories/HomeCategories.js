import React, { useEffect, useState } from 'react';
// const axios = require('axios');
import axios from 'axios';
import HomeCategory from './HomeCategory';

const HomeCategories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const axiosCall = async () => {
            const res = await axios.get('https://resale-server-murex.vercel.app/Categories');
            setCategories(res.data);
        }
        axiosCall();
    }, []);


    return (
        <div>
            <div className="md:flex gap-10 mx-auto w-fit rounded-box my-10 md:my-16">
                {
                    categories.map(category => <HomeCategory key={category._id} category={category}></HomeCategory>)
                }

            </div>

        </div>
    );
};

export default HomeCategories;