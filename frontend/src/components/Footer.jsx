// src/components/Footer.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube
} from "react-icons/fa";

const Footer = () => {
  const [cities] = useState([
    { name: "Gurgaon", path: "/city/gurgaon" },
    { name: "Delhi", path: "/city/delhi" },
    { name: "Noida", path: "/city/noida" },
  ]);

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const phone = formData.get('phone').trim();
    const email = formData.get('email')?.trim() || "Not provided";
    const message = formData.get('message')?.trim() || "No message";

    if (!name || !phone) {
      alert("Please fill in all required fields (Name and Phone).");
      return;
    }

    const whatsappMessage = `🔹 *New Enquiry Received* 🔹\n\n📌 *Name:* ${name}\n📞 *Phone:* ${phone}\n✉ *Email:* ${email}\n📝 *Message:* ${message}`;
    const whatsappURL = `https://wa.me/917982151029?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, "_blank");
    form.reset();
  };

  const propertySections = [
    {
      title: "NEW PROPERTY IN INDIA",
      items: [
        "New Property In Gurgaon",
        "New Property In Delhi",
        "New Property In Noida",
      ],
    },
    {
      title: "RESIDENTIAL PROPERTY IN INDIA",
      items: [
        "Residential Property In Gurgaon",
        "Residential Property In Delhi",
        "Residential Property In Noida",
      ],
    },
    {
      title: "COMMERCIAL PROPERTY IN INDIA",
      items: [
        "Commercial Property In Gurgaon",
        "Commercial Property In Delhi",
        "Commercial Property In Noida",
      ],
    },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Career", path: "/career" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const services = [
    { name: "Residential", path: "/residential" },
    { name: "Commercial", path: "/commercial" },
    { name: "Plots", path: "/plots" },
    { name: "SCO", path: "/sco" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, url: "https://www.facebook.com/share/1CajLpkSbJ/" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/peakforcerealty" },
    { icon: <FaTwitter />, url: "https://twitter.com/peakforcerealty" },
    { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/company/peak-force-realty/" },
    { icon: <FaYoutube />, url: "https://www.youtube.com/@PeakForceRealty" },
  ];

  return (
    <footer className="bg-[#00000087] text-white py-6 text-sm">
      <div className="px-4 max-w-6xl mx-auto inset-0 bg-opacity-70">
        {/* Cities Section */}
        <div>
          <h3 className="text-md font-bold border-b-2 border-[#359afd] inline-block">
            CITIES
          </h3>
          <div className="flex flex-wrap gap-3 mt-2 text-white text-md">
            {cities.map((city, index) => (
              <Link
                key={index}
                to={city.path}
                className="transition-all duration-300 hover:text-[#359afd] hover:scale-115"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Property Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          {propertySections.map((section, index) => (
            <div key={index}>
              <h3 className="text-md font-semibold border-b-2 border-[#359afd] inline-block">
                {section.title}
              </h3>
              <ul className="mt-2 text-white text-md space-y-1">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a href="#" className="transition-all duration-300 hover:text-[#359afd] hover:scale-110">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Form */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-[-23px]">
            <h3 className="text-md font-semibold border-b-2 border-[#359afd] inline-block">
              CONTACT WITH US
            </h3>
            <form onSubmit={handleWhatsAppSubmit} className="mt-2 space-y-2 text-xs">
              <input
                type="text"
                name="name"
                placeholder="Name*"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your phone number*"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <textarea
                name="message"
                placeholder="Write Message"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white h-16"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-green-600 py-2 text-white font-bold rounded flex items-center justify-center gap-2 hover:bg-green-500 transition cursor-pointer"
              >
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div>
            <h2 className="text-lg font-bold">PeakForce Homestate</h2>
            <p className="mt-2 text-white text-md">
              A trusted real estate company offering premium properties in India.
              We help you find the best investment opportunities.
            </p>
          </div>

          <div>
            <h3 className="text-md font-semibold">Quick Links</h3>
            <ul className="mt-2 text-white text-md space-y-1">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="transition-colors duration-300 hover:text-[#359afd] hover:scale-115"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold">Services</h3>
            <ul className="mt-2 text-white text-md space-y-1">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="transition-all duration-300 hover:text-[#359afd] hover:scale-115"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold">Contact Us</h3>
            <ul className="mt-2 space-y-1 text-white text-md">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-8 h-8" /> Unit No. 218, 2nd Floor,
                Vipul Trade Centre, Sohna Road, Gurgaon, Haryana 122018
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone />
                <a href="tel:9718954990" className="hover:text-black">
                  +91-9718954990
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope />
                <a href="mailto:info@peakforce.co.in" className="hover:text-black">
                  info@peakforce.co.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-white text-sm mt-6 border-t border-gray-700 pt-4 px-4 md:px-10 gap-4 md:gap-0">
        <div>
          © {new Date().getFullYear()} PeakForce Homestate. All Rights Reserved.
        </div>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-600 transition text-base md:text-lg"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;