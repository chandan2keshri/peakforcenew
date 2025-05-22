import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import PeakForceLeadership from "../components/PeakForceLeadership";
import ContactUsPopup from "../components/ContactUsPopup";

function About() {
  const [showContactForm, setShowContactForm] = useState(false);
  const handleClosePopup = () => {
    setShowContactForm(false);
  };
  return (
    <>
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-20 space-y-16">
          {/* Hero Section */}
          <section className="text-center py-20 px-4 bg-gradient-to-b from-white to-blue-200 rounded-2xl">
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-3xl font-bold text-center text-gray-900 mt-10 uppercase mb-10">
                About <span className="text-[#7d44eb]">Peak Force</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Your trusted partner in real estate investment and property
                solutions. Discover how we transform real estate opportunities
                into lasting value.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              </div>
            </div>
          </section>

          <PeakForceLeadership />

          {/* Mission Section */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-200 rounded-2xl">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-3xl font-bold text-center text-gray-900 mt-10 uppercase mb-10">
                Our <span className="text-[#7d44eb]">Mission</span>
              </h1>

              <div className="text-gray-700 text-lg leading-relaxed space-y-6">
                <p>
                  At{" "}
                  <span className="font-semibold text-blue-700">
                    Peak Force
                  </span>
                  , we are committed to providing exceptional real estate
                  services that exceed client expectations. Our mission is to
                  empower individuals and businesses with strategic property
                  solutions that maximize value and deliver long-term success.
                </p>
                <p>
                  We believe in building lasting relationships through
                  integrity, expertise, and personalized service. Whether you're
                  looking to invest, sell, or manage property, we're here to
                  guide you every step of the way.
                </p>
              </div>

              <div className="flex justify-center">
                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-200 rounded-2xl">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-3xl font-bold text-center text-gray-900 mt-10 uppercase mb-10">
                Our <span className="text-[#7d44eb]">Vision</span>
              </h1>

              <div className="text-gray-700 text-lg leading-relaxed space-y-6">
                <p>
                  We envision a future where real estate investments are
                  accessible, transparent, and profitable for everyone. Through{" "}
                  <span className="font-semibold text-purple-600">
                    innovation
                  </span>
                  ,{" "}
                  <span className="font-semibold text-purple-600">
                    integrity
                  </span>
                  , and{" "}
                  <span className="font-semibold text-purple-600">
                    excellence
                  </span>
                  , we strive to become the premier choice for real estate
                  solutions worldwide.
                </p>
                <p>
                  Our vision is to set new standards in the industry by
                  combining cutting-edge technology with time-tested real estate
                  principles to create opportunities that benefit both our
                  clients and communities.
                </p>
              </div>

              <div className="flex justify-center">
                <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>
              </div>
            </div>
          </section>

          {/* Core Values Section */}
          <section className="py-20 bg-gradient-to-b from-white to-blue-200 rounded-2xl">
            <h1 className="text-3xl font-bold text-center text-gray-900 mt-10 uppercase mb-10">
              Our <span className="text-[#7d44eb]">Core Values</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-4">
              {/* Card Component */}
              {[
                {
                  title: "Integrity",
                  color: "blue",
                  text: "We conduct business with honesty and transparency in everything we do.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 9V7a4 4 0 00-8 0v2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-8a2 2 0 00-2-2h-2z"
                    />
                  ),
                },
                {
                  title: "Client-Centric",
                  color: "purple",
                  text: "Your success is our priority – we tailor solutions to meet your unique needs.",
                  icon: (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 15c2.021 0 3.932.389 5.679 1.095M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19.428 15.341A8 8 0 104.572 15.34M4 4l16 16"
                      />
                    </>
                  ),
                },
                {
                  title: "Innovation",
                  color: "pink",
                  text: "We leverage technology and creative thinking to deliver exceptional results.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 3a1 1 0 011-1 1 1 0 011 1v1a1 1 0 01-2 0V3zM4.222 4.222a1 1 0 011.414 0L7.05 5.636a1 1 0 01-1.415 1.414L4.222 5.636a1 1 0 010-1.414zm13.435 0a1 1 0 011.414 1.414L18.364 7.05a1 1 0 01-1.414-1.414l1.707-1.707zM12 7a5 5 0 00-5 5 5 5 0 001 3v2a1 1 0 01-.293.707l-2 2A1 1 0 007 21h10a1 1 0 00.707-1.707l-2-2A1 1 0 0115 17v-2a5 5 0 001-3 5 5 0 00-5-5z"
                    />
                  ),
                },
                {
                  title: "Excellence",
                  color: "blue",
                  text: "We strive for perfection in every aspect of our service delivery.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0h6m-6 0H6"
                    />
                  ),
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className={`bg-${value.color}-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-105 text-center`}
                >
                  <div className={`text-${value.color}-600 mb-4`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {value.icon}
                    </svg>
                  </div>
                  <h3
                    className={`text-xl font-semibold text-${value.color}-700 mb-2`}
                  >
                    {value.title}
                  </h3>
                  <p className="text-gray-700 text-sm">{value.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 bg-gradient-to-b from-white to-blue-200 rounded-2xl">
            <h1 className="text-3xl font-bold text-center text-gray-900 mt-10 uppercase mb-10">
              Our <span className="text-[#7d44eb]">Services</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-4">
              {[
                {
                  title: "Real Estate Investment",
                  text: "Strategic investment guidance for maximizing returns.",
                  color: "blue",
                  icon: (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10l9-6 9 6v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 21V9h6v12"
                      />
                    </>
                  ),
                },
                {
                  title: "Property Management",
                  text: "Comprehensive management solutions for residential and commercial properties.",
                  color: "purple",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  ),
                },
                {
                  title: "Property Sales",
                  text: "Expert assistance in selling your property at the best possible price.",
                  color: "pink",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 16l3 3 4-4M5 13V6a1 1 0 011-1h3m10 4v10a1 1 0 01-1 1h-5M16 5l3 3-4 4"
                    />
                  ),
                },
                {
                  title: "Leasing Services",
                  text: "Professional leasing solutions for property owners and tenants.",
                  color: "blue",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L15 12 9.75 7v10zM3 5h2v14H3V5z"
                    />
                  ),
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className={`bg-${service.color}-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-105 text-center`}
                >
                  <div className={`text-${service.color}-600 mb-4`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {service.icon}
                    </svg>
                  </div>
                  <h3
                    className={`text-xl font-semibold text-${service.color}-700 mb-2`}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-700 text-sm">{service.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          {/* <section className="py-20 bg-gradient-to-b from-white to-blue-200 rounded-2xl"> */}
          {/* <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-center text-gray-900 mt-10 uppercase mb-10">
                Our <span className="text-[#7d44eb]">Team</span>
              </h1>

              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our team consists of experienced real estate professionals with
                diverse backgrounds in property management, investment analysis,
                and market research.
              </p>
              <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
                Meet our dedicated professionals who are committed to helping
                you achieve your real estate goals:
              </p>
            </div> */}

          {/* <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4"> */}
          {/* Team Member 1 */}
          {/* <div className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
                <img
                  src="/images/Chandan.jpg"
                  alt="Chandan Keshri"
                  className="w-50 h-60 mx-auto rounded-full object-cover border-4 border-indigo-200"
                />
                <h3 className="text-xl font-semibold text-indigo-700 mt-4">
                  Chandan Keshri
                </h3>
                <p className="text-sm text-gray-500">
                  IT & Social Media Expert
                </p>
                <p className="text-gray-600 text-sm mt-3">
                  A skilled IT & Social Media Expert specializing in digital
                  marketing, content strategy, and tech support. Expert in
                  boosting online presence through effective campaigns and
                  platform management. Brings creativity, efficiency, and strong
                  technical knowledge to enhance brand identity and ensure
                  smooth digital operations across all social media and IT
                  systems.
                </p>
              </div> */}

          {/* Team Member 2 */}
          {/* <div className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
                <img
                  src="/images/team-placeholder.png"
                  alt="Simran Shahdeo"
                  className="w-50 h-60 mx-auto rounded-full object-cover border-4 border-purple-200"
                />
                <h3 className="text-xl font-semibold text-purple-700 mt-4">
                  Simran Shahdeo
                </h3>
                <p className="text-sm text-gray-500">IT Support & Automation</p>
                <p className="text-gray-600 text-sm mt-3">
                  An expert in IT Support & Automation, skilled in streamlining
                  workflows and ensuring seamless tech operations. Proficient in
                  troubleshooting, system optimization, and automating
                  repetitive tasks to boost productivity. Brings a proactive
                  approach to problem-solving and ensures reliable digital
                  infrastructure for smooth and efficient organizational
                  performance.
                </p>
              </div> */}

          {/* Team Member 3 */}
          {/* <div className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
                <img
                  src="/images/team-placeholder.png"
                  alt="Hans Kumari"
                  className="w-50 h-60 mx-auto rounded-full object-cover border-4 border-pink-200"
                />
                <h3 className="text-xl font-semibold text-pink-700 mt-4">
                  Hans Kumari
                </h3>
                <p className="text-sm text-gray-500">Sales Manager</p>
                <p className="text-gray-600 text-sm mt-3">
                A seasoned professional in sales and client relations, she brings expertise in developing strong customer connections and driving consistent revenue growth. Her proactive approach, excellent communication, and ability to close deals effectively make her a vital part of the team, consistently contributing to strategic goals and business success.
                </p>
              </div> */}
          {/* </div> */}
          {/* </section> */}

          {/* Why Choose Us Section */}
          <section className="py-20 bg-gradient-to-b from-white to-blue-200 rounded-2xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-center text-gray-900 mt-10 uppercase mb-10">
                Why Choose <span className="text-[#7d44eb]">Peak Force?</span>
              </h1>

              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                With Peak Force, you're not just getting a service — you're
                gaining a committed partner focused on your success. Our blend
                of integrity, innovation, and deep industry expertise means we
                always deliver tailored, high-impact solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
              {/* Benefit 1 */}
              <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition duration-300 text-center">
                <div className="text-indigo-600 text-5xl mb-4">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Innovative Strategies
                </h3>
                <p className="text-gray-600">
                  We use cutting-edge tools and creative thinking to deliver
                  future-proof real estate solutions.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition duration-300 text-center">
                <div className="text-purple-600 text-5xl mb-4">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Trusted Partnerships
                </h3>
                <p className="text-gray-600">
                  We build long-term relationships based on transparency, trust,
                  and consistent results.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition duration-300 text-center">
                <div className="text-pink-600 text-5xl mb-4">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Proven Track Record
                </h3>
                <p className="text-gray-600">
                  Years of success across residential and commercial real estate
                  investments.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-10 rounded-xl shadow-lg transition-transform active:scale-95"
              >
                Contact Us Today
              </button>

              {showContactForm && (
                <div className="mt-12">
                  <ContactUsPopup onClose={handleClosePopup} />
                </div>
              )}
            </div>
          </section>
        </div>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default About;
