import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Page Imports
import Home from "./pages/Home";
import AboutUs from "./pages/About";
import Contact from "./pages/Contact";
import Career from "./pages/Career";
import Residential from "./pages/Residential";
import Commercial from "./pages/Commercial";
import Plots from "./pages/Plots";
import Sco from "./pages/Sco";
import CityPage from "./pages/CityPage";
import TrendingProjectsPage from "./pages/TrendingProjectsPage";
import AllDevelopers from "./pages/AllDevelopers";
import DeveloperProjects2 from "./pages/DeveloperProjects/DeveloperProjects2";
import ProjectDetails from "./pages/DeveloperProjects/ProjectDetails";
import NotFound from "./pages/NotFound";
import FloorPlans from "./components/DeveloperProjects/FloorPlans";
import ProjectCountPage from "./components/ProjectCountPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Home Routes */}
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Core Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact-us" element={<Contact />} />

        {/* Property Types */}
        <Route path="/residential" element={<Residential />} />
        <Route path="/commercial" element={<Commercial />} />
        <Route path="/plots" element={<Plots />} />
        <Route path="/sco" element={<Sco />} />


        {/* Dynamic city route - should come after specific cities */}
        <Route path="/city/:cityName" element={<CityPage />} />

        {/* Projects & Developers */}
        <Route path="/trending-projects" element={<TrendingProjectsPage />} />
        <Route
          path="/project-details/:developerName/:projectId"
          element={<ProjectDetails />}
        />
        <Route
          path="/project-details/:companyName"
          element={<DeveloperProjects2 />}
        />
        <Route path="/project-details" element={<AllDevelopers />} />

        {/* Floor Plans */}
        <Route path="/floor-plans/:company" element={<FloorPlans />} />

        {/* Redirections */}
        <Route
          path="/banglore"
          element={<Navigate to="/bangalore" replace />}
        />
        <Route
          path="/contact"
          element={<Navigate to="/contact-us" replace />}
        />

        {/* 404 Handling */}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/projects-count" element={<ProjectCountPage />} />
      </Routes>
    </>
  );
}

export default App;
