import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ContactPopup from "./ContactPopup";
import SocialMediaSticky from "./SocialMediaSticky";
import WhatsAppButton from "./WhatsAppButton";
import EnquiryForm from "./EnquiryForm";
import CallButton from "./CallButton";

const TrendingProjects = () => {
  const scrollRef = useRef(null);
  const [isManualScroll, setIsManualScroll] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/data/trendingProjects.json")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = window.innerWidth < 768 ? 200 : 300;

      current.scrollTo({
        left:
          direction === "left"
            ? current.scrollLeft - scrollAmount
            : current.scrollLeft + scrollAmount,
        behavior: "smooth",
      });

      setIsManualScroll(true);
      setTimeout(() => setIsManualScroll(false), 10000);
    }
  };

  useEffect(() => {
    if (!isManualScroll) {
      const interval = setInterval(() => {
        if (scrollRef.current) {
          const { current } = scrollRef;
          const maxScroll = current.scrollWidth - current.clientWidth;

          if (current.scrollLeft >= maxScroll) {
            current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            current.scrollTo({
              left: current.scrollLeft + 300,
              behavior: "smooth",
            });
          }
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isManualScroll]);

  // Handle project click and open slug URL in new tab
  const handleProjectClick = (slug) => {
    window.open(`${slug}`, "_blank");
  };

  return (
    <>
      <div className="w-full px-4 mt-10 pl-10 pr-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 mt-10 uppercase">
          Trending <span className="text-[#7d44eb]">Projects</span>
        </h2>
        <h3 className="text-lg md:text-xl text-gray-700 mb-6 text-center">
          The Noteworthy Real Estate in India
        </h3>

        {/* Horizontal Scroll Section */}
        <div className="relative overflow-hidden hover:cursor-pointer">
          {/* Left Scroll Button */}
          <button
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md z-10 hover:bg-gray-100 transition cursor-pointer"
            onClick={() => scroll("left")}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth p-4 custom-scrollbar no-scrollbar"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="min-w-[80%] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[320px] bg-white shadow-md rounded-lg p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => handleProjectClick(project.slug)}
                data-slug={project.slug}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-40 object-cover rounded-md transition-transform duration-300 hover:scale-110"
                />
                <h3 className="text-lg font-bold mt-2">{project.name}</h3>
                <p className="text-gray-600">{project.price}</p>
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md z-10 hover:bg-gray-100 transition cursor-pointer"
            onClick={() => scroll("right")}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => window.open("/trending-projects", "_blank")}
            className="bg-[#7d44eb] text-white py-2 px-6 rounded-full hover:bg-[#359afd] transition cursor-pointer"
          >
            View All Trending Projects
          </button>
        </div>
      </div>
    </>
  );
};

export default TrendingProjects;
