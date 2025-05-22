import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Square, Maximize } from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import ContactUsPopup from "../ContactUsPopup";
import PaymentPlan from "./PaymentPlans";

const FloorPlans = ({ setActiveItem }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [floorPlans, setFloorPlans] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeDeveloper, setActiveDeveloper] = useState(null);
  const paymentPlanRef = useRef(null); // Create a ref for the PaymentPlan component

  const handleTabChange = () => {
    setActiveItem("payment"); // Set the active tab to 'payment'
  };

  const handleClosePopup = () => {
    setShowContactForm(false);
  };

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    const urlParams = new URLSearchParams(window.location.search);
    const queryCompany = urlParams.get("company");

    const projectIdFromUrl =
      lastSegment !== "" && lastSegment !== "floor-plans" ? lastSegment : null;

    if (projectIdFromUrl) {
      setActiveProjectId(projectIdFromUrl);
    }

    if (queryCompany) {
      setActiveDeveloper(queryCompany.toLowerCase());
    }
  });

  useEffect(() => {
    const fetchFloorPlans = async () => {
      try {
        const response = await fetch("/data/floorAndPaymentPlans.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setFloorPlans(data);
      } catch (err) {
        console.error("Error fetching floor plans:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFloorPlans();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center text-red-600 bg-red-50 rounded-lg">
        <p>Error loading floor plans: {error}</p>
      </div>
    );
  }

  let currentPlans = [];
  let developerName = "";

  if (activeProjectId) {
    for (const [developer, projects] of Object.entries(floorPlans)) {
      const matchingProject = projects.find(
        (project) => project.id === activeProjectId
      );
      if (matchingProject) {
        currentPlans = [matchingProject];
        developerName = developer;
        break;
      }
    }
  } else if (activeDeveloper) {
    const developerKey = Object.keys(floorPlans).find(
      (key) => key.toLowerCase() === activeDeveloper.toLowerCase()
    );
    if (developerKey) {
      currentPlans = floorPlans[developerKey];
      developerName = developerKey;
    }
  }

  const showArrows =
    currentPlans.length > 0 && currentPlans[0].floors.length > 1;

  const formatDeveloperName = (name) => {
    if (!name) return "Selected";
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatAmount = (amount) => {
    const cleanedAmount = amount.replace("₹", "").replace(/,/g, "").trim();
    const value = parseFloat(cleanedAmount);

    if (value >= 10000000) {
      return `₹ ${Math.round(value / 10000000)} Cr`;
    } else if (value >= 100000) {
      return `₹ ${Math.round(value / 100000)} Lakh`;
    }
    return `₹ ${value}`;
  };

  const scrollToPaymentPlan = () => {
    if (paymentPlanRef.current) {
      const yOffset = -50; // adjust this value to control how much higher you want it
      const y =
        paymentPlanRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {currentPlans.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={
            showArrows
              ? { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
              : false
          }
          pagination={true}
          loop={showArrows}
          className="w-full max-w-5xl mx-auto relative rounded-lg shadow-md overflow-hidden"
        >
          {currentPlans.flatMap((plan) =>
            plan.floors.map((floor, floorIndex) => {
              const areaValue = parseFloat(floor.area.replace(" sqft", ""));
              const pricePerSqftValue = parseFloat(
                floor.pricePerSqft.replace("₹ ", "").replace(",", "")
              );
              const totalPrice = areaValue * pricePerSqftValue;

              return (
                <SwiperSlide key={`${plan.id}-${floorIndex}`}>
                  <div className="flex flex-col lg:flex-row w-full min-h-[280px] bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="w-full lg:w-1/2 bg-gray-200 flex flex-col">
                      <div className="flex-grow flex items-center justify-center p-6">
                        <div className="relative w-full h-full max-h-[200px] flex items-center justify-center">
                          <img
                            src={floor.image}
                            alt={`Floor Plan - ${floor.floorNumber}`}
                            className="max-w-full max-h-full object-contain rounded-md border border-gray-300 shadow-sm"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/random-image.jpg";
                            }}
                          />
                        </div>
                      </div>
                      <div className="p-4 text-center">
                        <button
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-all duration-200 shadow-sm flex items-center justify-center mx-auto space-x-2 cursor-pointer"
                          onClick={() =>
                            window.open("/images/random-image.jpg", "_blank")
                          }
                        >
                          <Maximize size={16} />
                          <span>View Full Image</span>
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col p-6 items-center justify-center bg-gray-50">
                      <div className="mb-6 text-center bg-gray-200 rounded-lg p-4 shadow-sm border border-gray-100 w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {floor.floorNumber}
                        </h3>
                        <p className="text-gray-600 text-sm font-medium">
                          Configuration: {floor.configuration}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <div className="flex items-center bg-gray-200 p-3 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-blue-200">
                          <div className="bg-blue-50 p-2 rounded-full mr-3">
                            <Square size={22} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                              Area
                            </p>
                            <p className="text-base font-semibold text-gray-800">
                              {floor.area}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center bg-gray-200 p-3 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-blue-200">
                          <div className="bg-blue-50 p-2 rounded-full mr-3">
                            <FaRupeeSign size={22} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                              Price per Sq. Ft.
                            </p>
                            <p className="text-base font-semibold text-gray-800">
                              {floor.pricePerSqft}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center bg-gray-200 p-3 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-blue-200">
                          <div className="bg-blue-50 p-2 rounded-full mr-3">
                            <FaRupeeSign size={22} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                              Base Selling Price
                            </p>
                            <p className="text-base font-semibold text-gray-800">
                              {formatAmount(totalPrice.toString())}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => {
                              handleTabChange();
                              scrollToPaymentPlan(); // Scroll to the PaymentPlan component
                              setShowContactForm(true); // Optionally show the contact form
                            }}
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"
                          >
                            View Payment Plan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          )}
          {showArrows && (
            <>
              <div className="swiper-button-next !h-10 !w-10 after:!text-base !bg-white hover:!bg-blue-700 !rounded-full !shadow-md"></div>
              <div className="swiper-button-prev !h-10 !w-10 after:!text-base !bg-white hover:!bg-blue-700 !rounded-full !shadow-md"></div>
            </>
          )}
        </Swiper>
      ) : (
        <div className="flex items-center justify-center h-50 bg-white px-4">
          <div className="text-center py-8 px-4 bg-gray-200 rounded-xl shadow-md max-w-md w-full">
            <p className="text-gray-700 text-base mb-4 leading-relaxed">
              {activeProjectId
                ? `No floor plans available for this Project. Please contact us for base selling price and other details.`
                : activeDeveloper
                ? `No floor plans available for ${formatDeveloperName(
                    activeDeveloper
                  )}. Please contact us for base selling price and other details.`
                : "No project or developer selected. Please provide a project ID in the URL."}
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="mt-3 px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out text-sm"
            >
              Contact Us for Base Selling Price
            </button>

            {showContactForm && (
              <div className="mt-6">
                <ContactUsPopup onClose={handleClosePopup} />
              </div>
            )}
          </div>
        </div>
      )}
      <div ref={paymentPlanRef} className="mt-16">
        {/* <PaymentPlan /> */}
      </div>
    </div>
  );
};

export default FloorPlans;
