import React, { useState } from "react";

const CompanyDescription = ({ description }) => {
  const [showFull, setShowFull] = useState(false);

  // Function to toggle between short and full description
  const toggleDescription = () => {
    setShowFull(!showFull);
  };

  const words = description.split(" ");
  const totalWords = words.length;

  // ✅ Find a natural cutoff point for the first paragraph (50-70 words, must end at a full stop)
  let firstParaEnd = 50;
  while (firstParaEnd < 70 && firstParaEnd < totalWords) {
    if (words[firstParaEnd].includes(".")) break; // Stop at the next full stop
    firstParaEnd++;
  }

  // ✅ Extract first paragraph
  const firstPara = words.slice(0, firstParaEnd + 1).join(" ");
  const remainingWords = words.slice(firstParaEnd + 1);

  // ✅ Split remaining text into two complete paragraphs
  let secondParaEnd = Math.floor(remainingWords.length / 2);
  while (secondParaEnd < remainingWords.length) {
    if (remainingWords[secondParaEnd].includes(".")) break;
    secondParaEnd++;
  }

  const secondPara = remainingWords.slice(0, secondParaEnd + 1).join(" ");
  const thirdPara = remainingWords.slice(secondParaEnd + 1).join(" ");

  // ✅ Short preview (First paragraph only)
  const shortDescription = firstPara + "...";

  return (
    <div className="w-full px-4 md:px-8 flex flex-col items-start mb-10 mt-[-30px]">
      <div className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-700 font-serif leading-relaxed max-w-6xl text-justify">
        {showFull ? (
          <>
            <p className="mb-3">{firstPara}</p>
            {secondPara && <p className="mb-3">{secondPara}</p>}
            {thirdPara && <p>{thirdPara}</p>}
          </>
        ) : (
          shortDescription
        )}
      </div>

      {/* Read More / Read Less Button */}
      <button
        onClick={toggleDescription}
        className="text-blue-600 font-medium mt-2 text-[14px] md:text-[15px] lg:text-[16px] hover:underline focus:outline-none cursor-pointer transition-all duration-200"
      >
        {showFull ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

export default CompanyDescription;
