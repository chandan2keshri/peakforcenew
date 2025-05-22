import React from "react";
import { FaAward, FaCrown, FaUserTie, FaHandshake } from "react-icons/fa";

const PeakForceEdge = () => {
  const features = [
    {
      icon: <FaAward size={50} className="text-black mb-3" />,
      title: "Royalty",
      description:
        "We offer unmatched royalty rates in the real estate market, higher than any other consultant, ensuring maximum value for our clients.",
    },
    {
      icon: <FaCrown size={50} className="text-black mb-3" />,
      title: "Excellent Services",
      description:
        "We create a seamless connection between investors and investees, offering exceptional services and keeping investors updated on the latest opportunities available to them.",
    },
    {
      icon: <FaUserTie size={50} className="text-black mb-3" />,
      title: "Top Real Estate Agents",
      description:
        "With over 11 years of experience, we possess in-depth knowledge of the ideal investment properties you seek, making us the most reliable realtors you can trust completely.",
    },
    {
      icon: <FaHandshake size={50} className="text-black mb-3" />,
      title: "Best Consultant",
      description:
        "We prioritize the value of your hard-earned money by offering expert advice, ensuring you make the best investments and achieve maximum profitability.",
    },
  ];

  return (
    <section className="py-12 bg-gray-200">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-center text-gray-900 mt-10 uppercase">
          Peak Force <span className="text-[#7d44eb]">Edge</span> 
        </h2>
        <p className="text-xl text-gray-700 mb-15 text-center">
          We work on the following components and attempt to get you the best deals:
        </p>

        <div className="mt-8 grid md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              {feature.icon}
              <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PeakForceEdge;
