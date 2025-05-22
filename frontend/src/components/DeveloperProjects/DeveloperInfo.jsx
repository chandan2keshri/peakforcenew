import React, { useState, useEffect, useRef } from "react";
import { FaBuilding, FaCity, FaSpinner } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import CompanyDescription from "./CompanyDescription";

function DeveloperInfo() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [bgPosition, setBgPosition] = useState({ x: 50, y: 50 });
  const startPos = useRef({ x: 0, y: 0 });

  const location = useLocation();

  useEffect(() => {
    // Extract company name from URL
    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment);
    const companyNameFromUrl = pathSegments[pathSegments.length - 2];

    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/data/companyData.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch company data: ${response.status}`);
        }

        const data = await response.json();

        // Case-insensitive search
        const foundCompanyKey = Object.keys(data).find(
          (key) => key.toLowerCase() === companyNameFromUrl.toLowerCase()
        );

        if (foundCompanyKey) {
          setCompany(data[foundCompanyKey]);
        } else {
          throw new Error(`Company "${companyNameFromUrl}" not found`);
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
        setError(error.message);
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    if (companyNameFromUrl) {
      fetchCompany();
    } else {
      setError("No company specified in URL");
      setLoading(false);
    }
  }, [location.pathname]);

  const handleDragStart = (e) => {
    setDragging(true);
    startPos.current = {
      x: e.clientX || e.touches[0].clientX,
      y: e.clientY || e.touches[0].clientY,
    };
  };

  const handleDragMove = (e) => {
    if (!dragging) return;

    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    const deltaX = (clientX - startPos.current.x) * 0.3;
    const deltaY = (clientY - startPos.current.y) * 0.3;

    setBgPosition((prev) => ({
      x: Math.max(0, Math.min(100, prev.x - deltaX)),
      y: Math.max(0, Math.min(100, prev.y - deltaY)),
    }));

    startPos.current = { x: clientX, y: clientY };
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading company data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg max-w-4xl mx-auto mt-10">
        <h3 className="text-red-500 text-xl font-medium">Error</h3>
        <p className="text-gray-600 mt-2">{error}</p>
        <p className="text-sm text-gray-500 mt-4">
          Please check the URL or try again later
        </p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center p-8 bg-yellow-50 rounded-lg max-w-4xl mx-auto mt-10">
        <h3 className="text-yellow-600 text-xl font-medium">No company data</h3>
        <p className="text-gray-600 mt-2">Could not load company information</p>
      </div>
    );
  }

  return (
    <div>
      {/* Company Stats */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-0 p-0 rounded-lg text-center place-items-center">
        <div className="flex flex-col items-center justify-center p-4 border border-gray-300 bg-white rounded-lg shadow-md w-full">
          <img
            src={company.logo}
            alt={company.name}
            className="w-24 h-24 md:w-60 md:h-35 mb-2 rounded-lg"
          />
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <FaBuilding className="text-3xl md:text-5xl text-blue-500" />
          <p className="text-base md:text-2xl font-semibold mt-2">
            Total Projects
          </p>
          <p className="text-lg md:text-2xl font-bold">
            {company.totalProjects}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <FaSpinner className="text-3xl md:text-5xl text-green-500" />
          <p className="text-base md:text-2xl font-semibold mt-2">
            Ongoing Projects
          </p>
          <p className="text-lg md:text-2xl font-bold">
            {company.ongoingProjects}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <FaCity className="text-3xl md:text-5xl text-red-500" />
          <p className="text-base md:text-2xl font-semibold mt-2">
            City Presence
          </p>
          <p className="text-lg md:text-2xl font-bold">
            {company.cityPresence}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-6xl m-auto mt-10">
        <CompanyDescription description={company.description} />
      </div>
    </div>
  );
}

export default DeveloperInfo;
