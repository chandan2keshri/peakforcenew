import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send message via WhatsApp
  const sendWhatsAppMessage = (e) => {
    e.preventDefault(); // Prevents form from reloading the page

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    // WhatsApp Number (Replace with your own)
    const whatsappNumber = "917982151029"; // Format: CountryCode + Number (without + sign)

    // Message format
    const text = `Hello, I want to get in touch with you.

Name: ${name}
Email: ${email}
Message: ${message}`;

    // WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        <main className="flex-grow px-4 py-20">
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-white text-center mb-6">
            Your trusted partner in real estate investment and property
            solutions.
          </p>

          <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Get in Touch
                </h2>
                <p className="text-gray-600">
                  We’d love to hear from you! Reach out to us via phone, email,
                  or visit our office.
                </p>

                {/* Phone */}
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-blue-600" />
                  <a
                    href="tel:9718954990"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    +91-9718954990

                  </a>

                </div>

                {/* Email */}
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-red-500" />
                  <a
                    href="mailto:info@peakforce.co.in"
                    className="text-gray-700 hover:text-red-500"
                  >
                    info@peakforce.co.in
                  </a>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span className="text-gray-700">
                    Unit No. 218, 2nd Floor, Vipul Trade Centre, Sohna Road,
                    Gurgaon, Haryana 122018
                  </span>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/share/1CajLpkSbJ/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="text-blue-600 hover:text-blue-800 transition text-base md:text-lg" />
                  </a>
                  <a
                    href="https://www.instagram.com/peakforcerealty"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-pink-500 hover:text-pink-700 transition text-base md:text-lg" />
                  </a>
                  <a
                    href="https://twitter.com/peakforcerealty"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaXTwitter className="text-black hover:text-neutral-800 transition text-base md:text-lg" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/peak-force-realty/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="text-blue-700 hover:text-blue-800 transition text-base md:text-lg" />
                  </a>
                  <a
                    href="https://www.youtube.com/@PeakForceRealty"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube className="text-red-600 hover:text-red-700 transition text-base md:text-lg" />
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Send a Message
                </h2>
                <form className="mt-4 space-y-4" onSubmit={sendWhatsAppMessage}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 border rounded h-24 focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 cursor-pointer transition"
                  >
                    Send via WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* Google Map Integration */}
          <div className="mt-8">
            <h2 className="text-4xl font-bold text-white text-center mb-4">
              Our Location
            </h2>
            <div className="w-full h-80">
              <iframe
                title="Google Map"
                className="w-full h-full rounded-lg shadow-md"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.505738595512!2d77.04183221508047!3d28.40684128250843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d2299943b9043%3A0x2f521df48a7e3413!2sVipul%20Trade%20Centre!5e0!3m2!1sen!2sin!4v1649763043456!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
