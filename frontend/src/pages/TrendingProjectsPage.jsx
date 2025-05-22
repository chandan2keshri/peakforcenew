import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactPopup from "../components/ContactPopup";
import SocialMediaSticky from "../components/SocialMediaSticky";
import WhatsAppButton from "../components/WhatsAppButton";
import EnquiryForm from "../components/EnquiryForm";
import CallButton from "../components/CallButton";

const TrendingProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  //fetching data dynamically
  useEffect(() => {
    fetch("../../data/trendingProjects.json")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);
  // const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (slug) => {
    window.open(`${slug}`, "_blank");
  };

  return (
    <>
      <Header />
      <SocialMediaSticky />
      <WhatsAppButton />
      <EnquiryForm />
      <CallButton />

      <div className="max-w-7xl px-4 py-6 mt-10 mx-auto min-h-screen pl-10 pr-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 uppercase mt-10">
          All <span className="text-[#7d44eb]">Trending Projects</span>
        </h2>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-md rounded-lg p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => handleProjectClick(project.slug)}
              data-slug={project.slug}
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-40 object-cover rounded-md transition-transform duration-300 hover:scale-110 cursor-pointer"
                // onClick={() => setSelectedProject(project)}
              />
              <h3 className="text-xl font-bold mt-2">{project.name}</h3>
              <p className="text-gray-600">{project.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* {selectedProject && (
        <ContactPopup
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )} */}

      <Footer />
    </>
  );
};

export default TrendingProjectsPage;
