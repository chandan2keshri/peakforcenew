import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const LOCAL_JSON_PATH = "/data/testimonials.json";
const ReviewsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(LOCAL_JSON_PATH);
        if (!response.ok) {
          throw new Error("Failed to load local data");
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="text-center py-0 bg-white">
      <div className="relative max-w-5xl mx-auto mt-8 px-4 ">
        {/* Swiper Wrapper */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="py-8 flex justify-center items-center mx-auto"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-full max-w-xs mx-auto text-center hover:scale-105 transition-all duration-300">
                  {/* Review Screenshot */}
                  <img
                    src={item.image}
                    alt={`Review by ${item.name}`}
                    className="w-full h-auto rounded-lg"
                  />

                  {/* Name & Time */}
                  <div className="flex flex-col items-center text-sm text-gray-600 mt-4">
                    <strong>{item.name}</strong>
                    <p className="text-xs">{item.time}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button className="swiper-button-prev  text-white px-4 py-2 rounded-full font-semibold  transition hover:scale-110"></button>
            <button className="swiper-button-next text-white px-4 py-2 rounded-full font-semibold transition hover:scale-110"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
