import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

const AllDevelopers = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("../../data/leadingRealEstateDevelopers.json")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  return (
    <>
      <Header />
      <div className="w-full px-4 py-6 mt-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 uppercase mt-10">
          All Leading <span className="text-[#7d44eb]">Real Estate</span>{" "}
          Developers
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-md rounded-lg p-3 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              onClick={() => window.open(project.url, "_blank")}
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-28 h-28 object-contain rounded-md transition-transform duration-300 hover:scale-110"
              />
              <h3 className="text-md font-semibold mt-2 text-center">
                {project.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllDevelopers;
