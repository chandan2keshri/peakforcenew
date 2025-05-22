import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LeadingRealStateDevelopers = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("../../data/leadingRealEstateDevelopers.json")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Scroll function
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollAmount = 300;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? Math.max(scrollLeft - scrollAmount, 0)
            : Math.min(scrollLeft + scrollAmount, scrollWidth),
        behavior: "smooth",
      });
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollTo({
            left: scrollLeft + 300,
            behavior: "smooth",
          });
        }
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-4 mt-15 pl-10 pr-10 bg-gray-200 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-900 mt-10 uppercase mb-10">
        Leading <span className="text-[#7d44eb]">Real Estate</span> Developers
      </h2>

      {/* Horizontal Scroll Section */}
      <div className="relative overflow-hidden hover:cursor-pointer">
        {/* Left Scroll Button */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10 hover:cursor-pointer"
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth p-4 custom-scrollbar whitespace-nowrap"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="min-w-[200px] h-20 bg-white border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => window.open(project.url, "_blank")}
            >
              <img
                src={project.image}
                alt={project.name}
                className={`h-20 object-contain ${
                  project.id === 15 ? "w-[70%]" : "w-full"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10 hover:cursor-pointer"
          onClick={() => scroll("right")}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* View All Developers Button */}
      <div className="flex justify-center mt-6">
        <button
          className="bg-[#7d44eb] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#359afd] transition hover:cursor-pointer"
          onClick={() => window.open("/project-details", "_blank")}
        >
          View All Developers
        </button>
      </div>
    </div>
  );
};

export default LeadingRealStateDevelopers;
