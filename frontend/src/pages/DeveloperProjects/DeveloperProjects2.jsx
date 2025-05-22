import React from "react";
import { useParams } from "react-router-dom"; // Get company name from URL
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeroSection2 from "../../components/DeveloperProjects/HeroSection2";
import FiltersWithProjects from "../../components/DeveloperProjects/FiltersWithProjects";

function DeveloperProjects2() {
  const { companyName } = useParams(); // Extract company name from URL

  return (
    <>
      <Header />
      <HeroSection2 companyName={companyName} />
      {/* Pass companyName as a prop */}

      <FiltersWithProjects/>
      <Footer />
    </>
  );
}

export default DeveloperProjects2;
