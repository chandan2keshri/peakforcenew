import React, { useState, useEffect } from "react";
import ContactPopup from "./ContactPopup";

// Use the JSON file when running locally
const LOCAL_JSON_PATH = "/data/everythingContainer.json"; // Fetch from `public/` folder

// Uncomment and update API_URL when Django API is ready
// const API_URL = "http://localhost:8000/api/services/"; // Replace with your actual Django API URL

const EverythingContainer = () => {
  const [services, setServices] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(LOCAL_JSON_PATH);
        if (!response.ok) {
          throw new Error("Failed to load local data");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    /*
    // Future API integration - Uncomment when Django API is ready
    const fetchFromAPI = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching from API:", error);
      }
    };

    fetchFromAPI();
    */
  }, []);

  return (
    <div className="w-full px-6 py-10 mt-15">
      <h2 className="text-3xl font-bold text-center text-gray-900 mt-10 uppercase">
        Everything you <span className="text-[#7d44eb]">Need</span> at One Place
      </h2>
      <p className="text-xl text-gray-700 mb-15 text-center">
        In-House Services
      </p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => {
              if (service.slug) {
                window.open(service.slug, "_blank");
              } else {
                setSelectedProject(service); // Show popup if no slug
              }
            }}
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-16 h-16 object-contain"
            />
            <p className="mt-4 text-gray-800 font-medium">{service.name}</p>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ContactPopup
          service={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default EverythingContainer;
