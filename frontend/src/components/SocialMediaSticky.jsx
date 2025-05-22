import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

const SocialMediaSticky = () => {
  return (
    <div className="fixed top-3/6 right-0 transform -translate-y-1/2 flex flex-col space-y-1 bg-black bg-opacity-80 p-1 rounded-l-md shadow-md z-50 w-max">
      <a
        href="https://www.facebook.com/share/1CajLpkSbJ/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-600 transition text-lg inline-flex p-1"
      >
        <FaFacebookF />
      </a>
      <a
        href="https://www.instagram.com/peakforcerealty"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-pink-500 transition text-lg inline-flex p-1"
      >
        <FaInstagram />
      </a>
      <a
        href="https://twitter.com/peakforcerealty"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-400 transition text-lg inline-flex p-1"
      >
        <FaXTwitter />
      </a>
      <a
        href="https://www.linkedin.com/company/peak-force-realty/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-700 transition text-lg inline-flex p-1"
      >
        <FaLinkedinIn />
      </a>
      <a
        href="https://www.youtube.com/@PeakForceRealty"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-red-600 transition text-lg inline-flex p-1"
      >
        <FaYoutube />
      </a>
    </div>
  );
};

export default SocialMediaSticky;
