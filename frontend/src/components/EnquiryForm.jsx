import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const EnquiryForm = ({
  isOpenByDefault = false,
  buttonPosition = { bottom: "2rem", right: "1rem" },
}) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    let timer;
    if (submitStatus?.success) {
      timer = setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus(null);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [submitStatus]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Client-side validation
    if (!formData.name || !formData.mobile || !formData.email) {
      setSubmitStatus({
        success: false,
        message: "Please fill all required fields",
      });
      setIsSubmitting(false);
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      setSubmitStatus({
        success: false,
        message: "Please enter a valid 10-digit mobile number",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        // "http://localhost:5000/submit-enquiry",
        "https://peakforcebackend.onrender.com/submit-enquiry",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check for success in different response formats
      if (
        response.status === 200 ||
        response.data?.success ||
        response.data?.message
      ) {
        setSubmitStatus({
          success: true,
          message:
            response.data?.message ||
            "Enquiry submitted successfully! We'll contact you soon.",
        });
        setFormData({
          name: "",
          mobile: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error(response.data?.error || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);

      let errorMessage = "Failed to submit enquiry. Please try again later.";

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          error.response.statusText ||
          `Server responded with ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No response received from server";
      } else {
        errorMessage = error.message || "Error submitting enquiry";
      }

      setSubmitStatus({
        success: false,
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed z-50" style={buttonPosition}>
      {/* Floating Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setSubmitStatus(null);
        }}
        className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold 
                   px-6 py-3 text-base rounded-full shadow-lg transition-all duration-300 hover:shadow-xl
                   sm:px-4 sm:py-2 sm:text-sm lg:px-6 lg:py-3 lg:text-base hidden sm:block cursor-pointer"
        animate={{
          opacity: [1, 0.5, 1],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        whileHover={{ scale: 1.12 }}
      >
        <span className="flex items-center gap-2">
          <FaEnvelope className="text-lg sm:text-sm animate-bounce" />
          Inquire Now
        </span>
      </motion.button>

      {/* Enquiry Form */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute bg-white text-black p-4 rounded-lg z-100 shadow-xl w-80 border border-gray-300 z-1000"
          style={{
            bottom: "3.5rem",
            right: "0.5rem",
            transform: "translate(5%, 0%)",
          }}
        >
          {!submitStatus?.success ? (
            <>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-700 hover:text-red-500 transition cursor-pointer"
              >
                <FaTimes size={16} />
              </button>

              <h3 className="text-lg font-semibold border-b border-gray-300 pb-2 text-blue-700 mb-3">
                Property Enquiry
              </h3>
            </>
          ) : null}

          {submitStatus && (
            <div
              className={`mb-3 p-3 rounded text-sm flex items-start gap-2 ${
                submitStatus.success
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {submitStatus.success ? (
                <FaCheck className="mt-0.5 flex-shrink-0" />
              ) : (
                <FaExclamationTriangle className="mt-0.5 flex-shrink-0" />
              )}
              <span>{submitStatus.message}</span>
            </div>
          )}

          {!submitStatus?.success ? (
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile*
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  maxLength="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded-md h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${
                  isSubmitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white py-2 px-4 text-sm font-medium rounded-md transition-colors duration-300 flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Submit Enquiry"
                )}
              </button>
            </form>
          ) : null}
        </motion.div>
      )}
    </div>
  );
};

export default EnquiryForm;
