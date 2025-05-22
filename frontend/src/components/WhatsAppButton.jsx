import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = ({ position = "bottom" }) => {
  const whatsappNumber = "917982151029"; // ✅ Your personal WhatsApp number
  const message = "Hello, I am interested in your properties!"; // ✅ Custom message

  const openWhatsApp = () => {
    const whatsappURL = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    window.location.href = whatsappURL; // ✅ Opens WhatsApp Desktop/App directly
  };

  // ✅ Adjusted Positioning to Move the Button Higher
  const positionClass =
    position === "top"
      ? "top-1/4 transform -translate-y-1/2" // Top position
      : "bottom-30"; // Moved button higher from bottom

  return (
    <div className={`fixed right-4 ${positionClass} z-50`}>
      {/* ✅ Floating WhatsApp Button */}
      <button
        onClick={openWhatsApp} // ✅ Opens WhatsApp desktop/app directly
        className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-300 transition flex items-center justify-center cursor-pointer"
      >
        <FaWhatsapp className="text-green-500 text-4xl w-7 h-7" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
