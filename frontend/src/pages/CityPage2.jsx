import React from "react";
import { useParams } from "react-router-dom";

// Static city pages content
const staticCities = {
  gurgaon: {
    title: "Gurgaon Real Estate",
    description:
      "Gurgaon offers premium residential and commercial properties with top-notch amenities.",
  },
  delhi: {
    title: "Delhi Real Estate",
    description:
      "Find the best residential and commercial properties in Delhi with great investment potential.",
  },
  noida: {
    title: "Noida Real Estate",
    description:
      "Noida is a growing hub for real estate investment with excellent infrastructure and connectivity.",
  },
};

const CityPage = () => {
  const { cityName } = useParams(); // Get city name from URL
  const formattedCityName = cityName.toLowerCase().replace("-", " ");

  // Check if the city exists in staticCities
  const cityData = staticCities[formattedCityName];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800">
        {cityData ? cityData.title : `Welcome to ${formattedCityName}`}
      </h1>
      <p className="mt-4 text-gray-600">
        {cityData
          ? cityData.description
          : `Find the best real estate properties in ${formattedCityName}.
            Browse listings, check prices, and explore investment opportunities.`}
      </p>
    </div>
  );
};

export default CityPage;
