import React, { useEffect, useState } from "react";
import ContactPopup from "./ContactPopup";

const LOCAL_JSON_PATH = "/data/topLocalities.json";

const TopLocalities = () => {
  const [localities, setLocalities] = useState([]);

  // fetching data from local json file or api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(LOCAL_JSON_PATH);
        if (!response.ok) {
          throw new Error("Failed to load local data");
        }
        const data = await response.json();
        setLocalities(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="text-center py-12 bg-gray-200">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-900 mt-10 uppercase">
        Top <span className="text-[#7d44eb]">Localities</span>
      </h2>
      <p className="text-xl text-gray-700 mb-10">
        Properties in Most Popular Places
      </p>

      {/* Grid Container */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-8 px-4">
        {localities.map((location) => (
          <div
            key={location.id}
            className="relative group cursor-pointer"
            onClick={() => setSelectedLocation(location)}
          >
            {/* Image */}
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-52 object-cover rounded-lg transition-transform duration-300  transform group-hover:scale-105"
              style={{ filter: "brightness(70%)" }}
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-40 rounded-lg">
              <span className="text-white text-lg font-bold">
                {location.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Popup */}
      {selectedLocation && (
        <ContactPopup
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </div>
  );
};

export default TopLocalities;
