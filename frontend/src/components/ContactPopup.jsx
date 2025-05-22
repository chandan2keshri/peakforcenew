import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react"; // npm install lucide-react
import { motion } from "framer-motion"; // npm install framer-motion

const ContactPopup = ({ project, service, location, onClose }) => {
  const selectedItem = project || service || location;
  if (!selectedItem) return null;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendWhatsAppMessage = () => {
    const { name, phone, email, message } = formData;

    if (!phone.trim()) {
      alert("Please enter a valid phone number.");
      return;
    }

    const text = `Hello, I'm interested in ${selectedItem.name}.
    
Name: ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}`;

    const whatsappNumber = "917982151029"; // Replace with your WhatsApp number
    const whatsappURL = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(text)}`;

    // Redirect to WhatsApp (like WhatsAppButton)
    window.location.href = whatsappURL;

    // Close the popup immediately
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white p-6 rounded-lg shadow-lg w-80 relative"
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 cursor-pointer"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
        <p className="text-gray-700 mb-4">
          Interested in <strong>{selectedItem.name}</strong>? Send us a message
          on WhatsApp!
        </p>

        <input
          type="text"
          name="name"
          // ref={nameInputRef}
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded h-20 mb-2"
        ></textarea>

        <button
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 cursor-pointer"
          onClick={sendWhatsAppMessage}
        >
          Send via WhatsApp
        </button>
      </motion.div>
    </div>
  );
};

export default ContactPopup;
