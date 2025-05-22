import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import SearchBar from "./SearchBar";

const HeroSection = ({ searchQuery, setSearchQuery }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const images = [
    "/images/HeroSectionBGImg1.jpg",
    "/images/HeroSectionBGImg2.jpg",
    "/images/HeroSectionBGImg3.jpg",
    "/images/HeroSectionBGImg4.jpg",
    "/images/HeroSectionBGImg5.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(1);
  const [slide, setSlide] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(true);
      setTimeout(() => {
        setCurrentImage(nextImage);
        setNextImage((prevIndex) => (prevIndex + 1) % images.length);
        setSlide(false);
      }, 1200);
    }, 4000);
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center mt-17 overflow-hidden ">
      {/* Background Images */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-[1200ms] ease-in-out"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
          opacity: slide ? 0 : 1,
        }}
      ></div>

      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-[1200ms] ease-in-out"
        style={{
          backgroundImage: `url(${images[nextImage]})`,
          opacity: slide ? 1 : 0,
        }}
      ></div>

      {/* Buttons Section - Shifted slightly left */}
      <div className="absolute top-[30%] sm:top-[35%] md:top-[39%] w-full flex flex-wrap justify-center items-center gap-3 px-4 z-25 md:ml-[-260px]">
        {/* Buy Button with Dropdown */}
        <div
          className="relative group"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button className="bg-[#1E1E1E] text-white font-bold px-5 py-2 rounded-full shadow-md hover:bg-[#359afd] transition cursor-pointer hover:scale-105 flex items-center gap-2">
            Buy{" "}
            <FaChevronDown
              className={`text-sm transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className="absolute left-0 top-full w-48 bg-white shadow-lg rounded-lg transition-all duration-300 ease-in-out transform z-50 mt-0.5"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-black hover:text-white cursor-pointer transition duration-200 border-b border-gray-200">
                  <Link to="/residential">Residential</Link>
                </li>
                <li className="px-4 py-2 hover:bg-black hover:text-white cursor-pointer transition duration-200 border-b border-gray-200">
                  <Link to="/commercial">Commercial</Link>
                </li>
                <li className="px-4 py-2 hover:bg-black hover:text-white cursor-pointer transition duration-200 border-b border-gray-200">
                  <Link to="/plots">Plots</Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-black hover:text-white cursor-pointer transition duration-200"
                  title="Shop-cum-Office"
                >
                  <Link to="/sco">SCO</Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Rent Button */}
        <button className="bg-[#1E1E1E] text-white font-bold px-5 py-2 rounded-full shadow-md hover:bg-[#359afd] transition duration-100 hover:shadow-lg hover:scale-105 cursor-pointer">
          Rent / Lease
        </button>

        {/* Sell Button */}
        <button className="bg-[#1E1E1E] text-white font-bold px-5 py-2 rounded-full shadow-md hover:bg-[#359afd] transition duration-100 hover:shadow-lg hover:scale-105 cursor-pointer">
          Sell
        </button>
      </div>

      <SearchBar />
    </div>
  );
};

export default HeroSection;
