import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TrendingProjects from "../components/TrendingProjects";
import LeadingRealStateDevelopers from "../components/LeadingRealStateDevelopers";
import EverythingContainer from "../components/EverythingContainer";
import PeakForceEdge from "../components/PeakForceEdge";
import Testimonials from "../components/Testimonials";
import TopLocalities from "../components/TopLocalities";
import EnquiryForm from "../components/EnquiryForm";
import WhatsAppButton from "../components/WhatsAppButton";
import CallButton from "../components/CallButton";
import HeroSection from "../components/HeroSection";
import SocialMediaSticky from "../components/SocialMediaSticky";
import ContactUsPopup from "../components/ContactUsPopup"; // Import ContactUsPopup
import UpcomingProjects from "../components/UpcomingProjects";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Show the popup once, delay it for 5 seconds, and prevent showing again on reload
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenContactPopup");

    if (!hasSeenPopup) {
      const timeout = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("hasSeenContactPopup", "true"); // Mark that the popup has been seen
      }, 5000); // 5-second delay

      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* Hero Section */}
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {/* <UpcomingProjects /> */}
        {/* Other Sections */}
        <TrendingProjects />
        <LeadingRealStateDevelopers />
        <EverythingContainer />
        <PeakForceEdge />
        <Testimonials />
        <TopLocalities />
        <SocialMediaSticky />
        <WhatsAppButton />
        <div className="mt-8 flex justify-center">
          <EnquiryForm
            isOpenByDefault={false}
            buttonPosition={{ bottom: "4rem", right: "2rem" }}
          />
        </div>
        <CallButton />

        {/* Conditionally render the Contact Popup */}
        {showPopup && <ContactUsPopup onClose={() => setShowPopup(false)} />}

        <div className="text-center mt-6">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
