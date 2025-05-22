import React, { useState, useEffect, useRef } from "react";
import { FaBuilding, FaCity, FaSpinner } from "react-icons/fa";
import companyData from "../../../public/data/companyData.json";
import CompanyDescription from "./CompanyDescription";

function HeroSection2({ companyName }) {
  const [company, setCompany] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [bgPosition, setBgPosition] = useState({ x: 50, y: 50 });
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (companyData[companyName]) {
      setCompany(companyData[companyName]);
    }
  }, [companyName]);

  if (!company) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  // Handle Mouse/Tap Start
  const handleDragStart = (e) => {
    setDragging(true);
    startPos.current = { x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY };
  };

  // Handle Mouse/Tap Move
  const handleDragMove = (e) => {
    if (!dragging) return;

    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    const deltaX = (clientX - startPos.current.x) * 0.3; // Adjust sensitivity
    const deltaY = (clientY - startPos.current.y) * 0.3;

    setBgPosition((prev) => ({
      x: Math.max(0, Math.min(100, prev.x - deltaX)),
      y: Math.max(0, Math.min(100, prev.y - deltaY)),
    }));

    startPos.current = { x: clientX, y: clientY };
  };

  // Handle Mouse/Tap End
  const handleDragEnd = () => {
    setDragging(false);
  };

  return (
    <div>
      {/* Background Image and Company Name */}
      <div
        className={`w-full h-[400px] flex flex-col items-center justify-center relative rounded-lg overflow-hidden mt-18 shadow-2xl ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{
          backgroundImage: `url(${company.bgImage})`,
          backgroundSize: "150%", 
          backgroundPosition: `${bgPosition.x}% ${bgPosition.y}%`,
          userSelect: "none",
          transition: dragging ? "none" : "background-position 0.2s ease-out",
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-[#0000004d] bg-opacity-20"></div>

        {/* Company Name and Logo */}
        <div className="flex flex-col items-center justify-center p-4 w-full">
          <img src={company.logo} alt={company.name} className="w-24 h-24 md:w-60 md:h-35 mb-2 rounded-lg" />
        </div>

        <h1
          className="relative text-3xl md:text-8xl font-bold uppercase px-6 py-3 rounded-lg text-center 
        bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
        text-transparent bg-clip-text font-montserrat"
        >
          {company.name}
        </h1>
      </div>

      {/* Company Details Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-15 p-6 rounded-lg text-center place-items-center">
        <div className="flex flex-col items-center justify-center p-4 border border-gray-300 bg-white rounded-lg shadow-md w-full">
          <img src={company.logo} alt={company.name} className="w-24 h-24 md:w-60 md:h-35 mb-2 rounded-lg" />
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <FaBuilding className="text-3xl md:text-5xl text-blue-500" />
          <p className="text-base md:text-2xl font-semibold mt-2">Total Projects</p>
          <p className="text-lg md:text-2xl font-bold">{company.totalProjects}</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <FaSpinner className="text-3xl md:text-5xl text-green-500" />
          <p className="text-base md:text-2xl font-semibold mt-2">Ongoing Projects</p>
          <p className="text-lg md:text-2xl font-bold">{company.ongoingProjects}</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <FaCity className="text-3xl md:text-5xl text-red-500" />
          <p className="text-base md:text-2xl font-semibold mt-2">City Presence</p>
          <p className="text-lg md:text-2xl font-bold">{company.cityPresence}</p>
        </div>
      </div>

      {/* Company Description */}
      <div className="max-w-6xl m-auto mt-10">
        <CompanyDescription description={company.description} />
      </div>
    </div>
  );
}

export default HeroSection2;
