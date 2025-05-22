import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white  border-gray-400 transition-all duration-300 border-b  ${
        isScrolled ? "bg-[#3E4C59] shadow-md border-b text-[#000]" : ""
      }`}
    >
      <nav className="max-w-[1200px] mx-auto flex justify-between items-center h-[70px] px-6 md:px-5">
        <div className="h-[70px] flex items-center px-4 sm:px-6 md:px-10 lg:px-0 xl:px-0 lg:ml-[-20px] xl:ml-[-40px] overflow-hidden">
          <Link to="/" className="flex items-center">
            <img
              src="/images/PeakForceLogo.png"
              alt="PeakForce Logo"
              className="h-6 sm:h-12 md:h-14 lg:h-16 xl:h-16 w-auto max-w-[220px] object-contain"
            />
          </Link>
        </div>

        {/* Right - Navigation Menu */}
        <ul className="hidden md:flex space-x-8 uppercase font-sans text-md">
          {["Home", "Trending Projects", "About", "Career", "Contact Us"].map(
            (item, index) => (
              <li key={index}>
                <Link
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className={`relative ${
                    isScrolled ? "text-[#000]" : "text-[#000]"
                  } transition duration-300 hover:text-gray-300 group font-montserrat`}
                >
                  {item}
                  <span
                    className={`absolute left-0 bottom-0 w-0 h-[2px] bg-[#7d44eb] transition-all duration-300 group-hover:w-full ${
                      isScrolled ? "bg-white" : "bg-[#7d44eb]"
                    }`}
                  ></span>
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-[72px] right-0 w-48 bg-white shadow-lg rounded-lg p-4 flex flex-col z-40">
            {["Home", "Trending Projects", "About", "Career", "Contact Us"].map(
              (item, index) => (
                <Link
                  key={index}
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-black text-lg font-medium transition duration-300 p-2 border-b border-[#359afd] last:border-none"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              )
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
