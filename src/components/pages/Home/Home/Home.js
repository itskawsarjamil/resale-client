import React from 'react';
import Carousel from '../Carousel/Carousel';
import Slider from '../Slider/Slider';
import HomeCategories from '../HomeCategories/HomeCategories';
import Testimonial from '../Testimonial/Testimonial';
import WhyWeStart from '../WhyWeStart/WhyWeStart';
import AboutResale from '../AboutResale/AboutResale';

const Home = () => {
    return (
        <div className=''>
            <Carousel/>
            <Slider />
            <HomeCategories />
            <Testimonial />
            <WhyWeStart />
            <AboutResale />
        </div>
    );
};

export default Home;