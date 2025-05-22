import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import ContactPopup from "../components/ContactPopup";

const localities = [
  {
    name: "Signature Global",
    image: "/images/Residential/signatureGlobal.webp",
  },
];

const SCO = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <>
      <Header />
      <div className="text-center py-12 bg-white">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mt-10 uppercase">
          SCO <span className="text-[#7d44eb]">Properties</span>
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-8 px-4 ">
          {localities.map((location, index) => (
            <div key={index} className="relative group cursor-pointer">
              {/* Image */}
              <img
                src={location.image}
                alt={`Property ${index + 1}`}
                className="w-full h-52 object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-105 border-2 border-gray-300"
                onClick={() => setSelectedProject(location)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Contact Popup */}
      {selectedProject && (
        <ContactPopup
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      <Footer />
    </>
  );
};

export default SCO;
