import React from 'react';
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import bc1 from "../../../assets/bookcover/book1.jpg";
import bc2 from "../../../assets/bookcover/book2.jpg";
import bc3 from "../../../assets/bookcover/book3.jpg";
import bc4 from "../../../assets/bookcover/book4.jpg";
import bc5 from "../../../assets/bookcover/book5.jpg";

const Slider = () => {
    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={1}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper my-10 md:my-16"
            >
                <SwiperSlide><img src={bc1} className='lg:h-96' alt='' /> </SwiperSlide>
                <SwiperSlide><img src={bc2} className='lg:h-96' alt='' /> </SwiperSlide>
                <SwiperSlide><img src={bc3} className='lg:h-96' alt='' /> </SwiperSlide>
                <SwiperSlide><img src={bc4} className='lg:h-96' alt='' /> </SwiperSlide>
                <SwiperSlide><img src={bc5} className='lg:h-96' alt='' /> </SwiperSlide>

            </Swiper>
        </>
    );
};

export default Slider;