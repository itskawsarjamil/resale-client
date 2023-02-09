import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import bc1 from "../../../assets/bookcover/book1.jpg";
import bc2 from "../../../assets/bookcover/book2.jpg";
import bc3 from "../../../assets/bookcover/book3.jpg";
import bc4 from "../../../assets/bookcover/book4.jpg";
import bc5 from "../../../assets/bookcover/book5.jpg";
import { useQuery } from 'react-query';
import Spinner from '../../Shared/Spinner/Spinner';

const Slider = () => {
    const { isLoading, data: adv = [] } = useQuery({
        queryKey: ["adv"],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/adv');
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <Spinner />;
    }
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
                {/* <SwiperSlide ><img src={bc1} className='lg:h-96' alt='' /> </SwiperSlide> */}
                {
                    adv.map(ad => <SwiperSlide key={ad._id}><img src={ad.book_img} className='lg:h-96' alt='' /> </SwiperSlide>)
                }

            </Swiper>
        </>
    );
};

export default Slider;