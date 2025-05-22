import { useState } from "react";
import {
  X,
  CheckCircle,
  Briefcase,
  Megaphone,
  DollarSign,
  Settings,
  Code,
  Palette,
  Headphones,
  Package,
  Users,
  MoreHorizontal,
  Menu,
} from "lucide-react";

const CareerSidebar = () => {
  const categories = [
    { name: "Sales", icon: <Briefcase size={20} /> },
    { name: "Marketing", icon: <Megaphone size={20} /> },
    { name: "Finance", icon: <DollarSign size={20} /> },
    { name: "Operations", icon: <Settings size={20} /> },
    { name: "Technology", icon: <Code size={20} /> },
    { name: "Design", icon: <Palette size={20} /> },
    { name: "Customer Support", icon: <Headphones size={20} /> },
    { name: "Product Management", icon: <Package size={20} /> },
    { name: "Developer Relations", icon: <Users size={20} /> },
    { name: "Others", icon: <MoreHorizontal size={20} /> },
  ];

  const jobOpenings = {
    Sales: ["Sales Manager", "Business Development Executive"],
    Marketing: ["SEO Specialist", "Social Media Manager"],
    Finance: ["Financial Analyst", "Accountant"],
    Operations: ["Operations Manager", "Logistics Coordinator"],
    Technology: ["Software Engineer", "Tech Lead"],
    Design: ["UI/UX Designer", "Graphic Designer"],
    "Customer Support": ["Support Representative", "Customer Success Manager"],
    "Product Management": ["Product Manager", "Product Owner"],
    "Developer Relations": ["Dev Advocate", "Community Manager"],
    Others: ["HR Manager", "Legal Advisor"],
  };

  const [selectedCategory, setSelectedCategory] = useState("Sales");
  const [selectedJob, setSelectedJob] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row mt-24 mb-10 relative">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className={`md:hidden bg-blue-600 text-white p-2 m-2 rounded fixed top-20 left-4 z-[100] transition-opacity duration-300 ${
          sidebarOpen ? "opacity-0" : "opacity-100"
        }`}
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-3/4 md:w-1/4 bg-white shadow-lg rounded-lg p-4 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex-shrink-0 z-[10] mt-19 md:mt-0 overflow-y-auto max-h-screen`}
      >
        <div className="flex justify-between items-center mb-4 px-3 py-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Careers with PeakForce
          </h2>
          {/* Close Button for Mobile */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={25} />
          </button>
        </div>

        {/* Category List */}
        <ul className="space-y-2">
          {categories.map((item, index) => (
            <li
              key={index}
              className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition ${
                selectedCategory === item.name
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => {
                setSelectedCategory(item.name);
                setSelectedJob(null);
                setFormSubmitted(false);
                setSidebarOpen(false);
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-[98]"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Job Listings or Application Form */}
      <section className="flex-grow p-6">
        {selectedJob ? (
          // Job Application Form
          <div className="bg-white p-6 shadow-lg rounded-lg max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Apply for {selectedJob}
            </h2>
            {formSubmitted ? (
              // Success Message
              <div className="flex flex-col items-center space-y-4">
                <CheckCircle size={50} className="text-green-500" />
                <p className="text-lg font-semibold text-gray-700">
                  Application Submitted Successfully!
                </p>
              </div>
            ) : (
              // Form
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full p-[12px] border rounded focus:outline-none focus:ring focus:ring-blue"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full p-[12px] border rounded focus:outline-none focus:ring focus:ring-blue"
                />
                <textarea
                  placeholder="Tell us about yourself..."
                  rows={5}
                  required
                  className="w-full p-[12px] border rounded focus:outline-none focus:ring focus:ring-blue"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-[10px] rounded hover:bg-blue-700 transition"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        ) : (
          // Job Listings
          <>
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Open Positions in {selectedCategory}
            </h2>
            {jobOpenings[selectedCategory].map((job, index) => (
              <div
                key={index}
                onClick={() => setSelectedJob(job)}
                className="bg-white p-[16px] shadow-md rounded-md mb-[12px] cursor-pointer hover:bg-blue-50 transition"
              >
                {job}
              </div>
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default CareerSidebar;
