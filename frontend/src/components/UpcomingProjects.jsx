import React, { useState } from "react";
import {
  FiX,
  FiMapPin,
  FiCalendar,
  FiHome,
  FiBriefcase,
  FiStar,
} from "react-icons/fi";

const upcomingProjects = [
  {
    id: 1,
    name: "Skymark Real Estate Investments Portfolio",
    developer: "Skymark Real Estate Investors, LLC",
    location: "Florida and Maryland, USA",
    type: "Mixed-Use (Residential & Commercial)",
    launchDate: "Various (Over 40 years of operations)",
    startingPrice: "Not specified",
    status: "Completed and Ongoing Projects",
    image: "https://skymarkinvestments.com/images/skymark.jpg",
    highlights: [
      "Over 10,000 units developed, including single-family subdivisions, PUDs, apartments, and commercial properties",
      "Specializes in land acquisition, development, and joint venture financing",
      "Integrated real estate investment and development firm with over 40 years of experience",
    ],
  },
  {
    id: 2,
    name: "Orion Tech Park",
    developer: "XYZ Constructions",
    location: "Bangalore, Karnataka",
    type: "Commercial",
    launchDate: "Q4 2025",
    startingPrice: "₹1.5 Cr",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    highlights: ["LEED Certified", "Flexible office spaces", "24/7 security"],
  },
];

const StatusBadge = ({ status }) => {
  const statusStyles = {
    "Pre-Launch": "bg-blue-100 text-blue-800",
    "Coming Soon": "bg-purple-100 text-purple-800",
    "Launching Soon": "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

const UpcomingProjects = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-8 right-8 w-full max-w-md bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-100 transform transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
        <div>
          <h2 className="text-xl font-bold">Upcoming Projects</h2>
          <p className="text-sm opacity-90">
            Discover premium real estate opportunities
          </p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200 text-xl font-bold transition-colors cursor-pointer"
        >
          <FiX size={24} />
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto">
        {upcomingProjects.map((project) => (
          <div
            key={project.id}
            className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <div className="relative">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-lg font-semibold text-white">
                  {project.name}
                </h3>
                <p className="text-sm text-white/90">{project.developer}</p>
              </div>
              <div className="absolute top-3 right-3">
                <StatusBadge status={project.status} />
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FiMapPin className="mr-1" />
                <span>{project.location}</span>
              </div>

              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center text-sm">
                  {project.type === "Commercial" ? (
                    <FiBriefcase className="mr-1 text-gray-500" />
                  ) : (
                    <FiHome className="mr-1 text-gray-500" />
                  )}
                  <span className="text-gray-700">{project.type}</span>
                </div>
                <div className="flex items-center text-sm">
                  <FiCalendar className="mr-1 text-gray-500" />
                  <span className="text-gray-700">{project.launchDate}</span>
                </div>
              </div>

              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-800 mb-1 flex items-center">
                  <FiStar className="mr-1 text-yellow-500" /> Key Features
                </h4>
                <ul className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                  {project.highlights.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Starting from</p>
                  <p className="text-lg font-bold text-blue-600">
                    {project.startingPrice}
                  </p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
                  Register Interest
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-3 text-center border-t border-gray-200">
        <p className="text-xs text-gray-500">
          {upcomingProjects.length} upcoming projects • Last updated today
        </p>
      </div>
    </div>
  );
};

export default UpcomingProjects;
