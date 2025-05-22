import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdApartment,
  MdPayment,
  MdFormatListBulleted,
  MdLocationOn,
  MdCreditCard,
  MdStar,
  MdBusiness,
  MdHome,
  MdChevronRight,
  MdChevronLeft,
} from "react-icons/md";
import ContactUsPopup from "../ContactUsPopup";
import ProjectOverview from "./ProjectOverview";
import FloorPlans from "./FloorPlans";
import PaymentPlans from "./PaymentPlans";
import Specifications from "./Specifications";
import LocationInfo from "./LocationInfo";
import EmiCalculator from "./EmiCalculator";
import ReviewsSection from "./ReviewsSection";
import DeveloperInfo from "./DeveloperInfo";
import SimilarProjects from "./SimilarProjects";

const SpecificationMenu = ({ project }) => {
  const [showPopup, setShowPopup] = useState(false);
  const sectionRefs = useRef({});
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [activeItem, setActiveItem] = useState("Overview");

  // Enhanced data extraction with multiple fallbacks
  const getPropertyData = (key) => {
    const possiblePaths = [
      project?.vc?.[key],
      project?.details?.[key],
      project?.specs?.[key],
      project?.features?.[key],
      project?.[key],
    ];

    for (const data of possiblePaths) {
      if (Array.isArray(data) && data.length > 0) return data;
      if (typeof data === "object" && data !== null)
        return Object.values(data).filter(Boolean);
    }
    return [];
  };

  const menuItems = useMemo(
    () => [
      {
        label: "Overview",
        path: "overview",
        icon: <MdOutlineDashboard />,
        content: <ProjectOverview project={project} />,
      },
      {
        label: "Floor Plan",
        path: "floor-plan",
        icon: <MdApartment />,
        content: <FloorPlans setActiveItem={setActiveItem} />,
      },
      {
        label: "Payment Plan",
        path: "payment",
        icon: <MdPayment />,
        content: <PaymentPlans />,
      },
      {
        label: "Specifications",
        path: "specifications",
        icon: <MdFormatListBulleted />,
        content: <Specifications />,
      },
      {
        label: "Location",
        path: "location",
        icon: <MdLocationOn />,
        content: <LocationInfo />,
      },
      {
        label: "EMI Calculator",
        path: "emi",
        icon: <MdCreditCard />,
        content: <EmiCalculator />,
      },
      {
        label: "Reviews",
        path: "rating",
        icon: <MdStar />,
        content: <ReviewsSection />,
      },
      {
        label: "About Developer",
        path: "about-developer",
        icon: <MdBusiness />,
        content: <DeveloperInfo />,
      },
      {
        label: "Similar Projects",
        path: "similar-projects",
        icon: <MdHome />,
        content: (
          <SimilarProjects
            onGetRecommendations={() => setShowPopup(true)}
            project={project}
          />
        ),
      },
    ],
    [project]
  );

  const scrollToSection = useCallback((label) => {
    if (sectionRefs.current[label]) {
      const offset = 150;
      const elementPosition =
        sectionRefs.current[label].getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
      setActiveItem(label);
    }
  }, []);

  const handleScroll = useCallback((direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        setShowLeftArrow(scrollRef.current.scrollLeft > 0);
        setShowRightArrow(
          scrollRef.current.scrollLeft <
            scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        );
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const [label, element] of Object.entries(sectionRefs.current)) {
        if (!element) continue;

        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveItem(label);
          break;
        }
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", checkScroll);
      checkScroll();
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="project-details-container">
      <div className="sticky top-17 z-10 bg-white shadow-md mt-10">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
            <h2 className="text-xl font-bold text-white">
              Project Details: {project.name}
            </h2>
          </div>
          <div className="relative">
            {showLeftArrow && (
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10 cursor-pointer"
                onClick={() => handleScroll("left")}
              >
                <MdChevronLeft className="text-gray-700 text-2xl" />
              </button>
            )}
            <div
              ref={scrollRef}
              className="py-1 scrollbar-hide overflow-x-auto"
            >
              <ul className="flex w-max min-w-full">
                {menuItems.map((item, index) => (
                  <li key={index} className="flex-shrink-0">
                    <button
                      onClick={() => scrollToSection(item.label)}
                      className={`flex items-center px-3 py-3 transition-colors duration-200 cursor-pointer rounded-lg ${
                        activeItem === item.label
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      <span className="mr-2 text-lg">{item.icon}</span>
                      <span className="whitespace-nowrap">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {showRightArrow && (
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10 cursor-pointer"
                onClick={() => handleScroll("right")}
              >
                <MdChevronRight className="text-gray-700 text-2xl" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {menuItems.map((item, index) => (
          <section
            key={index}
            ref={(el) => (sectionRefs.current[item.label] = el)}
            className="mb-10 py-10 border-b border-gray-300"
            id={item.path}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              {item.label}
            </h3>
            <div className="text-gray-600">{item.content}</div>
          </section>
        ))}
      </div>
      {showPopup && <ContactUsPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default React.memo(SpecificationMenu);
