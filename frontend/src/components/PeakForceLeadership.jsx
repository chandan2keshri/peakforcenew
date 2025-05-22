import React, { useState } from "react";
import { motion } from "framer-motion";

const PeakForceLeadership = () => {
  const [showFull, setShowFull] = useState(false);

  const leadershipData = [
    {
      name: "Aakash Tiwari",
      role: "Founder & Managing Director",
      description: `
With over a decade of hands-on experience in the real estate industry, Aakash Tiwari serves as the visionary Founder and Managing Director, known for driving growth, innovation, and integrity in every aspect of the business.

Starting his journey more than 10 years ago, Aakash Tiwari has successfully navigated the evolving real estate landscape, delivering results across residential, commercial, and investment sectors. His deep understanding of market trends, coupled with a client-first mindset, has earned him a reputation for reliability and excellence.

Passionate about building lasting relationships and creating real value, he focuses on personalized service, strategic planning, and transparent communication—empowering clients to make confident, informed decisions. His leadership continues to transform spaces and impact communities, one property at a time.`,
      image: "/images/aakash-profile.png",
    },
  ];

  const getShortDescription = (text) => {
    const words = text.trim().split(/\s+/);
    return words.slice(0, 50).join(" ") + "...";
  };

  return (
    <section className="bg-gradient-to-b from-white to-blue-200 py-20 rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-center text-gray-900 mt-10 uppercase mb-10">
            Leadership at <span className="text-[#7d44eb]">Peak Force</span>
          </h1>

          <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full" />
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Our leadership brings over a decade of experience and vision to
            shape the future of real estate.
          </p>
        </div>

        {/* Profile Card */}
        <div className="flex justify-center items-center">
          {leadershipData.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 max-w-4xl overflow-hidden border border-gray-200"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-64 w-full object-cover md:h-full md:w-64 border-r border-gray-200"
                    src={leader.image}
                    alt={leader.name}
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                    {leader.role}
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">
                    {leader.name}
                  </h3>
                  <p className="mt-4 text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                    {showFull
                      ? leader.description
                      : getShortDescription(leader.description)}
                  </p>
                  <button
                    onClick={() => setShowFull(!showFull)}
                    className="mt-4 inline-block px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full hover:from-indigo-600 hover:to-purple-700 transition duration-200 cursor-pointer"
                  >
                    {showFull ? "Show Less" : "Read More"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PeakForceLeadership;
