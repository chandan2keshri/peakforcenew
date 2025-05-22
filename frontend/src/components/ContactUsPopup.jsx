import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContactUsPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // ✅ Close Popup on Esc Key Press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose(); // Close popup when Esc key is pressed
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Send WhatsApp Message & Close Popup
  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = "917982151029"; // Replace with your WhatsApp number
    const text = `🔹 New Contact Enquiry 🔹\n
      🔹 Name: ${formData.name}\n
      🔹 Phone: ${formData.phone}\n
      🔹 Email: ${formData.email}\n
      🔹 Message: ${formData.message}`;

    const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      text
    )}`;

    // Redirect to WhatsApp
    window.location.href = whatsappURL;

    // Close the popup immediately
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-250 p-4"
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-white p-6 rounded-lg shadow-2xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full relative"
        >
          {/* ✅ Popup Header */}
          <motion.h2 className="text-xl md:text-2xl font-extrabold text-gray-700 mb-4 text-center uppercase">
            Contact Us
          </motion.h2>
          <motion.p className="text-gray-600 mb-4 text-center text-sm md:text-base">
            Get in touch with us for any queries or assistance.
          </motion.p>

          {/* ✅ Contact Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Your Contact Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md w-full text-sm md:text-base hover:bg-green-700 transition cursor-pointer"
            >
              Send via WhatsApp 📩
            </button>
          </form>

          {/* ✅ Close Button */}
          <button
            onClick={onClose}
            className="mt-4 w-full text-gray-600 hover:text-gray-900 text-sm md:text-base cursor-pointer transition text-center"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactUsPopup;


