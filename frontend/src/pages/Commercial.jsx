import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import ContactPopup from "../components/ContactPopup";

const localities = [
  {
    id: 2,
    name: "Godrej",
    image: "/images/godrej.jpg",
    url: "/project-details/godrej",
  },
  {
    id: 3,
    name: "BPTP",
    image: "/images/bptp.jpg",
    url: "/project-details/bptp",
  },
  {
    id: 5,
    name: "Elan",
    image: "/images/elan.jpg",
    url: "/project-details/elan",
  },
  {
    id: 6,
    name: "M3M",
    image: "/images/M3M_logo.jpg",
    url: "/project-details/m3m",
  },
  {
    id: 8,
    name: "Signature Global",
    image: "/images/signatureGlobal.webp",
    url: "/project-details/signature-global",
  },
  {
    id: 10,
    name: "Sobha",
    image: "/images/sobha.jpg",
    url: "/project-details/sobha",
  },
  {
    id: 11,
    name: "Krisumi",
    image: "/images/krisumi.jpeg",
    url: "/project-details/krisumi",
  },
  {
    id: 12,
    name: "Smart World",
    image: "/images/smartworld.jpg",
    url: "/project-details/smart-world",
  },
  {
    id: 13,
    name: "ROF",
    image: "/images/rof.jpeg",
    url: "/project-details/rof",
  },
  {
    id: 15,
    name: "Ganga",
    image: "/images/ganga.png",
    url: "/project-details/ganga",
    width: "50%",
  },
  {
    id: 16,
    name: "DLF",
    image: "/images/dlf.png",
    url: "/project-details/dlf",
  },
  {
    id: 17,
    name: "MRG",
    image: "/images/mrg.png",
    url: "/project-details/mrg",
  },
  {
    id: 18,
    name: "Omaxe",
    image: "/images/omaxe.webp",
    url: "/project-details/omaxe",
  },
  {
    id: 20,
    name: "Trevoc",
    image: "/images/trevoc.avif",
    url: "/project-details/trevoc",
  },
  {
    id: 22,
    name: "AIPL",
    image: "/images/aipl.png",
    url: "/project-details/aipl",
  },
  {
    id: 23,
    name: "Navraj",
    image: "/images/navraj.jpeg",
    url: "/project-details/navraj",
  },
  {
    id: 24,
    name: "4sDevelopers",
    image: "/images/4sDevelopers.png",
    url: "/project-details/4s-developers",
  },
  {
    id: 25,
    name: "Max",
    image: "/images/max.jpg",
    url: "/project-details/max",
  },
  {
    id: 26,
    name: "Trehan",
    image: "/images/Trehan-Home-Developers-Logo.webp",
    url: "/project-details/trehan",
  },
];

const Commercial = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <>
      <Header />
      <div className="text-center py-12 bg-white" >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mt-10 uppercase">
          Commercial <span className="text-[#7d44eb]">Properties</span>
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-8 px-4 ">
          {localities.map((location, index) => (
            <div key={index} className="relative group cursor-pointer">
              {/* Image */}
              {/* <img
                src={location.image}
                alt={`Property ${index + 1}`}
                className="w-full h-52 object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-105 border-2 border-gray-300" */}
              <img
                src={location.image}
                alt={`Property ${index + 1}`}
                className="min-w-[200px] h-25 bg-white border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
                // onClick={() => setSelectedProject(location)}

                onClick={() => window.open(location.url, "_blank")}
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

export default Commercial;