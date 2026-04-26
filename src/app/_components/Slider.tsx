"use client"
import React from 'react'
import { Navigation, Pagination} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


interface MySliderPropsType {
    listOfImages: string[],
    spaceBetween? : number,
    slidesPerView? : number
}
export default function Slider({listOfImages, spaceBetween = 100, slidesPerView = 3} : MySliderPropsType) {
    return (
        <Swiper
        modules={[Navigation, Pagination]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            pagination={{ clickable: true, bulletActiveClass : "opacity-100! bg-white! w-5! rounded-2xl!"}}
            // onSlideChange={() => console.log('slide change')}    // With the Slider image change
            // onSwiper={(swiper) => console.log(swiper)}       //Swip without slider image change
            >
            {listOfImages.map( (image,index) => 
                <SwiperSlide key={index}> 
                    <div className='w-full h-100 relative'>
                        <img  src={image} className='w-full h-100 object-cover' alt="Home Image" /> 
                        <div className='absolute inset-0 bg-emerald-400/50'></div>
                    </div>
                </SwiperSlide> 
            
            )}

        </Swiper>
    )
}
