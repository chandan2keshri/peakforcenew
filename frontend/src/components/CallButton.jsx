import React from "react";
import { FaPhone } from "react-icons/fa";

const CallButton = () => {
  const phoneNumber = "9718954990"; // Replace with your phone number

  return (
    <div className="fixed bottom-45 right-4 z-50 md:hidden">
      {/* Floating Call Button (Hidden on Desktop) */}
      <a
        href={`tel:${phoneNumber}`} // Opens phone dialer
        className="bg-white text-blue-700 p-4 rounded-full shadow-lg hover:bg-blue-700 hover:text-white transition flex items-center justify-center text-lg"
      >
        <FaPhone className="w-5 h-5" />
      </a>
    </div>
  );
};

export default CallButton;
