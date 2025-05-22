import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const ImageCarousel = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(
    new Array(project.images.length).fill(false)
  );

  const handleImageLoad = (index) => {
    setImagesLoaded((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  return (
    <div className="w-full px-6">
      <div className="relative h-120 w-full overflow-hidden rounded-2xl">
        {/* Image Slider */}
        <div className="relative h-full w-full flex">
          <AnimatePresence initial={false} custom={currentImageIndex}>
            <motion.div
              key={currentImageIndex}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "tween", duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              {!imagesLoaded[currentImageIndex] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <span className="text-gray-500">Loading image...</span>
                </div>
              )}
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.name} - ${currentImageIndex + 1}`}
                className={`w-full h-full object-cover rounded-2xl ${
                  imagesLoaded[currentImageIndex] ? "block" : "hidden"
                }`}
                onLoad={() => handleImageLoad(currentImageIndex)}
                onError={(e) => {
                  e.target.src = "/images/random-image.jpg";
                  handleImageLoad(currentImageIndex);
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 p-2 rounded-full shadow-lg hover:bg-white transition-all z-20 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 p-2 rounded-full shadow-lg hover:bg-white transition-all z-20 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 " />
            </button>
          </>
        )}

        {/* Thumbnail Indicators */}
        {project.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentImageIndex === index
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
