import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Pagination from "../Pagination";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  X,
  Home,
  Building,
  Hammer,
  MapPin,
  Layers,
  Ruler,
} from "lucide-react";

const fetchProjectsData = async (projectType) => {
  const jsonFile = `/data/${projectType}Projects.json`;
  try {
    const response = await fetch(jsonFile);
    if (!response.ok) throw new Error(`Failed to fetch ${jsonFile}`);
    return await response.json();
  } catch (error) {
    console.error("Error loading projects:", error);
    throw error;
  }
};

const validateProjectsData = (data) => {
  if (!data) return false;
  if (typeof data !== "object") return false;
  return Object.values(data).some(
    (projects) => Array.isArray(projects) && projects.length > 0
  );
};

const filters = {
  "Property Type": [
    "Residential Apartment",
    "Residential Land",
    "Independent House/Villa",
    "Farm House",
    "Studio Apartment",
  ],
  "No of Bedrooms": [
    "1 BHK",
    "2 BHK",
    "3 BHK",
    "3.5 BHK",
    "4 BHK",
    "4 BHK+",
    "4.5 BHK",
    "5 BHK",
    "Duplex",
  ],
  "Construction Status": ["New Launch", "Under Construction", "Ready To move"],
  "Furnishing Status": ["Furnished", "Semi-Furnished", "Unfurnished"],
};

const localities = [
  // Top Localities (prioritized)
  "Gurgaon",
  "Noida",
  "Delhi",
  "DLF Phase 1",
  "DLF Phase 2",
  "Golf Course Road",
  "Cyber City",
  "Sushant Lok Phase 1",
  "MG Road",
  "Sohna Road",
  "Sector 49",
  "Sector 50",
  "Sector 57",

  // Remaining Localities (excluding the ones above)
  "DLF Phase 3",
  "DLF Phase 4",
  "DLF Phase 5",
  "Sushant Lok Phase 2",
  "Sushant Lok Phase 3",
  "South City 1",
  "South City 2",
  "Nirvana Country",
  "Malibu Towne",
  "Sector 14",
  "Sector 15 Part 1",
  "Sector 15 Part 2",
  "Sector 21",
  "Sector 22",
  "Sector 23",
  "Sector 29",
  "Sector 44",
  "Sector 46",
  "Sector 47",
  "Sector 58",
  "Sector 59",
  "Sector 60",
  "Sector 61",
  "Sector 62",
  "Sector 63",
  "Sector 65",
  "Sector 66",
  "Sector 67",
  "Sector 68",
  "Sector 69",
  "Sector 70",
  "Sector 70A",
  "Sector 71",
  "Sector 72",
  "Sector 73",
  "Sector 74",
  "Sector 75",
  "Sector 76",
  "Sector 77",
  "Sector 78",
  "Sector 79",
  "Sector 80",
  "Sector 81",
  "Sector 82",
  "Sector 82A",
  "Sector 83",
  "Sector 84",
  "Sector 85",
  "Sector 86",
  "Sector 88",
  "Sector 89",
  "Sector 90",
  "Sector 91",
  "Sector 92",
  "Sector 93",
  "Sector 95",
  "Sector 99A",
  "Sector 99B",
  "Sector 102",
  "Sector 103",
  "Sector 104",
  "Sector 105",
  "Sector 106",
  "Sector 107",
  "Sector 108",
  "Sector 109",
  "Sector 110",
  "Sector 111",
  "Sector 112",
  "Sector 113",
  "Palam Vihar",
  "SPR (Southern Peripheral Road)",
  "Udyog Vihar Phase 1",
  "Udyog Vihar Phase 2",
  "Udyog Vihar Phase 3",
  "Udyog Vihar Phase 4",
  "Udyog Vihar Phase 5",
  "Dwarka Expressway",
  "Badshahpur",
  "Bhondsi",
  "Manesar",
  "Gwal Pahari",
  "Garhi Harsaru",
  "Farrukhnagar",
];

const LocalitiesFilter = ({
  selectedFilters,
  handleFilterChange,
  isMobile = false,

}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredLocalities = localities.filter((locality) =>
    locality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedLocalities = showAll
    ? filteredLocalities
    : filteredLocalities.slice(0, 3);

  return (
    <div className="mt-4 border-b border-gray-200 pb-3">
      <div className="flex justify-between items-center text-md font-semibold text-gray-800">
        Localities
      </div>
      <div className="mt-2">
        <input
          type="text"
          placeholder="Search localities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded text-sm mb-2"
        />
        <div
          className={`flex flex-wrap gap-2 ${
            isMobile ? "max-h-[200px] overflow-y-auto pb-2" : ""
          }`}
        >
          {displayedLocalities.map((locality) => (
            <button
              key={locality}
              onClick={() => handleFilterChange("Localities", locality)}
              className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                selectedFilters["Localities"]?.includes(locality)
                  ? "bg-blue-600 text-white ring-2 ring-blue-400"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-400"
              } ${isMobile ? "px-4 py-2" : ""}`}
            >
              {locality}
            </button>
          ))}
        </div>
        {filteredLocalities.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 text-sm mt-2 hover:underline"
          >
            {showAll ? "Show less" : `Show all (${filteredLocalities.length})`}
          </button>
        )}
      </div>
    </div>
  );
};

const FilterSidebar = ({
  selectedFilters,
  removeFilter,
  clearFilters,
  budget,
  handleBudgetChange,
  budgetUnit,
  handleBudgetUnitChange,
  area,
  handleAreaChange,
  areaUnit,
  handleAreaUnitChange,
  openFilters,
  setOpenFilters,
  handleFilterChange,
  isMobile = false,
  onClose = () => {},
}) => {
  return (
    <div
      className={
        isMobile
          ? "fixed top-0 right-0 bottom-15 w-4/5 max-w-md bg-gray-300 shadow-lg p-5 flex flex-col z-50"
          : "p-5 rounded-lg shadow-md bg-gray-300"
      }
    >
      {/* Header Section */}
      <div className="flex-shrink-0">
        {isMobile ? (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" /> Filter Properties
            </h2>
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" /> Filter Properties
            </h2>
            <button
              className="bg-white border border-gray-300 text-gray-700 font-medium text-sm rounded-full p-2 shadow-sm hover:bg-gray-100 cursor-pointer"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Selected Filters Chips */}
        <div className="mt-2 mb-4 flex flex-wrap gap-2 max-h-32 overflow-y-auto border-b border-2xl">
          {Object.entries(selectedFilters).map(([category, values]) =>
            values?.map((value) => (
              <div
                key={`${category}-${value}`}
                className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-2"
              >
                <span>
                  {/* {category}: {value} */}
                  {value}
                </span>
                <button
                  onClick={() => removeFilter(category, value)}
                  className="text-blue-800 hover:text-blue-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Clear All Button (Mobile Only) */}
        {isMobile && (
          <button
            className="w-full bg-red-500 text-white py-2 rounded-md mb-4 hover:bg-red-600 transition"
            onClick={clearFilters}
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Scrollable Content Area */}
      <div
        className={
          isMobile
            ? "overflow-y-auto flex-1 pb-4"
            : "overflow-y-auto max-h-[calc(100vh-200px)] p-2"
        }
      >
        {/* Budget Filter */}
        <div className="mt-4 border-b border-gray-200 pb-3">
          <div className="flex justify-between items-center text-md font-semibold text-gray-800">
            Budget (Min: ₹{budget[0]} {budgetUnit}, Max: ₹{budget[1]}{" "}
            {budgetUnit})
          </div>
          <div className="flex items-center mt-2">
            <span className="mr-2 text-sm">Min</span>
            <input
              type="range"
              min="1"
              max="100"
              step="0.1"
              value={budget[0]}
              onChange={(e) => handleBudgetChange(e, "min")}
              className="w-full mt-2 cursor-pointer"
            />
          </div>
          <div className="flex items-center mt-2">
            <span className="mr-2 text-sm">Max</span>
            <input
              type="range"
              min="1"
              max="100"
              step="0.1"
              value={budget[1]}
              onChange={(e) => handleBudgetChange(e, "max")}
              className="w-full mt-2 cursor-pointer"
            />
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={budget[0]}
              onChange={(e) => handleBudgetChange(e, "min")}
              step="0.1"
              className="w-full p-2 border rounded text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={budget[1]}
              onChange={(e) => handleBudgetChange(e, "max")}
              step="0.1"
              className="w-full p-2 border rounded text-sm"
            />
            <select
              value={budgetUnit}
              onChange={handleBudgetUnitChange}
              className="w-full p-2 border rounded text-sm"
            >
              <option value="L">Lakhs (L)</option>
              <option value="Cr">Crores (Cr)</option>
            </select>
          </div>
        </div>

        {/* Area Filter */}
        <div className="mt-4 border-b border-gray-200 pb-3">
          <div className="flex justify-between items-center text-md font-semibold text-gray-800">
            Area (Min: {area[0]} {areaUnit}, Max: {area[1]} {areaUnit})
          </div>
          <div className="flex items-center mt-2">
            <span className="mr-2 text-sm">Min</span>
            <input
              type="range"
              min="100"
              max="10000"
              step="10"
              value={area[0]}
              onChange={(e) => handleAreaChange(e, "min")}
              className="w-full mt-2 cursor-pointer"
            />
          </div>
          <div className="flex items-center mt-2">
            <span className="mr-2 text-sm">Max</span>
            <input
              type="range"
              min="100"
              max="10000"
              step="10"
              value={area[1]}
              onChange={(e) => handleAreaChange(e, "max")}
              className="w-full mt-2 cursor-pointer"
            />
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={area[0]}
              onChange={(e) => handleAreaChange(e, "min")}
              className="w-full p-2 border rounded text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={area[1]}
              onChange={(e) => handleAreaChange(e, "max")}
              className="w-full p-2 border rounded text-sm"
            />
            <select
              value={areaUnit}
              onChange={handleAreaUnitChange}
              className="w-full p-2 border rounded text-sm"
            >
              <option value="sqft">Sq. Ft</option>
              <option value="sqyd">Sq. Yard</option>
              <option value="acre">Acre</option>
            </select>
          </div>
        </div>

        {/* Localities Filter */}
        <LocalitiesFilter
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          isMobile={isMobile}
        />

        {/* Other Filters */}
        {Object.entries(filters).map(([category, options]) => (
          <div
            key={category}
            className="mt-4 border-b border-gray-200 pb-3 last:border-b-0"
          >
            <div
              className="flex justify-between items-center cursor-pointer text-md font-semibold text-gray-800"
              onClick={() =>
                setOpenFilters((prev) => ({
                  ...prev,
                  [category]: !prev[category],
                }))
              }
            >
              {category}
              {openFilters[category] ? <ChevronUp /> : <ChevronDown />}
            </div>
            {openFilters[category] && (
              <div
                className={`mt-2 pl-2 flex flex-wrap gap-2 ${
                  isMobile ? "max-h-[200px] overflow-y-auto pb-2" : ""
                }`}
              >
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange(category, option)}
                    className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                      selectedFilters[category]?.includes(option)
                        ? "bg-blue-600 text-white ring-2 ring-blue-400"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-400"
                    } ${isMobile ? "px-4 py-2" : ""}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

function FiltersWithProjects() {
  const navigate = useNavigate();
  const { companyName } = useParams();
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [budget, setBudget] = useState([1, 100]);
  const [budgetUnit, setBudgetUnit] = useState("Cr");
  const [openFilters, setOpenFilters] = useState({});
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [area, setArea] = useState([500, 5000]);
  const [areaUnit, setAreaUnit] = useState("sqft");
  const [projectType, setProjectType] = useState("residential");



  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoadingProjects(true);
        const projectsData = await fetchProjectsData(projectType);

        if (!validateProjectsData(projectsData)) {
          console.error("Invalid projects data structure:", projectsData);
          setAllProjects([]);
          setFilteredProjects([]);
          return;
        }

        let projectsToShow = [];
        if (companyName && projectsData[companyName]) {
          projectsToShow = projectsData[companyName];
          console.log(
            `Loaded ${projectsToShow.length} projects for ${companyName}`
          );
        } else {
          projectsToShow = Object.values(projectsData).flat();
          console.log(`Showing all ${projectsToShow.length} projects`);
        }

        const validatedProjects = projectsToShow.map((proj) => ({
          id: proj.id || Math.random().toString(36).substr(2, 9),
          name: proj.name || "Unnamed Project",
          developer: proj.developer || companyName || "Unknown Developer",
          price: proj.price || "Price not available",
          propertyType: proj.propertyType || "Unknown Type",
          bedrooms: proj.bedrooms || "",
          projectStatus: proj.projectStatus || "",
          localities: proj.localities || "",
          area: proj.area || "",
          image: proj.image || "/images/random-image.jpg",
          budget: proj.budget || [0, 0],
          ...proj,
        }));

        setAllProjects(validatedProjects);
        setFilteredProjects(validatedProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
        setAllProjects([]);
        setFilteredProjects([]);
      } finally {
        setIsLoadingProjects(false);
      }
    };

    loadProjects();
  }, [companyName, projectType]);

  const clearFilters = () => {
    setSelectedFilters({});
    setBudget([1, 100]);
    setBudgetUnit("Cr");
    setArea([500, 5000]);
    setAreaUnit("sqft");
  };

  const handleBudgetUnitChange = (e) => {
    setBudgetUnit(e.target.value);
  };

  const handleAreaUnitChange = (e) => {
    setAreaUnit(e.target.value);
  };

  const handleBudgetChange = (e, type) => {
    const value = parseFloat(e.target.value);
    if (type === "min") {
      setBudget([value, budget[1]]);
    } else if (type === "max") {
      setBudget([budget[0], value]);
    }
  };

  const handleAreaChange = (e, type) => {
    const value = parseFloat(e.target.value);
    if (type === "min") {
      setArea([value, area[1]]);
    } else if (type === "max") {
      setArea([area[0], value]);
    }
  };

  const handleFilterChange = (category, option) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (!newFilters[category]) {
        newFilters[category] = [];
      }
      const index = newFilters[category].indexOf(option);
      if (index === -1) {
        newFilters[category].push(option);
      } else {
        newFilters[category].splice(index, 1);
      }
      return newFilters;
    });
  };

  const removeFilter = (category, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      const index = newFilters[category].indexOf(value);
      if (index !== -1) {
        newFilters[category].splice(index, 1);
      }
      return newFilters;
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const { name, phone, message } = contactForm;
    const recipientPhoneNumber = "917982151029";

    // Construct the message string (normal line breaks)
    const text = `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`;

    // Encode the whole message properly
    const whatsappUrl = `https://wa.me/${recipientPhoneNumber}?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    const applyFilters = () => {
      const filtered = allProjects.filter((project) => {
        // Budget filter
        const budgetMatch = (() => {
          if (!project.budget) return true;
          const [minBudget, maxBudget] = Array.isArray(project.budget)
            ? project.budget
            : [project.budget, project.budget];
          const unitMultiplier = budgetUnit === "L" ? 100000 : 10000000;
          return (
            minBudget <= budget[1] * unitMultiplier &&
            maxBudget >= budget[0] * unitMultiplier
          );
        })();

        // Area filter
        const areaMatch = (() => {
          if (!project.area) return true;
          const areaValues = project.area.match(/\d+/g)?.map(Number) || [];
          if (areaValues.length === 0) return true;
          const [minArea, maxArea = minArea] = areaValues;
          return maxArea >= area[0] && minArea <= area[1];
        })();

        // Other filters
        const filtersMatch = Object.entries(selectedFilters).every(
          ([category, values]) => {
            if (!values || values.length === 0) return true;

            const projectValue =
              project[
                category === "No of Bedrooms"
                  ? "bedrooms"
                  : category === "Property Type"
                  ? "propertyType"
                  : category === "Construction Status"
                  ? "projectStatus"
                  : category === "Furnishing Status"
                  ? "furnishing"
                  : category === "Localities"
                  ? "localities"
                  : category.toLowerCase()
              ];

            return (
              projectValue &&
              values.some((v) => String(projectValue).includes(String(v)))
            );
          }
        );

        return budgetMatch && areaMatch && filtersMatch;
      });

      setFilteredProjects(filtered);
      setCurrentPage(1);
    };

    if (allProjects.length > 0) {
      applyFilters();
    }
  }, [allProjects, selectedFilters, budget, budgetUnit, area, areaUnit]);

  const { currentProjects, totalPages } = useMemo(() => {
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = filteredProjects.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    return { currentProjects, totalPages };
  }, [filteredProjects, currentPage, itemsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoadingProjects) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 lg:p-6">
      {/* Property Type Selection */}
      <div className="w-full text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-12 px-6 rounded-lg shadow-lg text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold leading-tight drop-shadow-lg">
            Find Your Perfect Property
          </h2>
          <p className="text-lg mt-3 opacity-90">
            Explore exclusive properties tailored to your lifestyle and
            investment needs. Whether you're looking for a cozy home or a prime
            commercial space, we have the perfect options for you.
          </p>
          <div className="mt-6">
            <a
              href="/project-details"
              className="inline-block px-6 py-3 text-lg font-medium bg-white text-blue-600 hover:bg-gray-200 transition duration-300 rounded-md shadow-md"
            >
              Explore Properties
            </a>
          </div>
        </div>
      </div>

      {/* Project Type Toggle */}
      <div className="w-full text-center mb-6 lg:mb-8 mt-10 bg-gradient-to-r from-blue-50 to-purple-50 py-0">
        <p className="text-2xl font-bold text-gray-900">
          What type of property are you looking for?
        </p>

        <div className="bg-white p-3 rounded-full shadow-lg inline-flex mt-6 mb-10 space-x-3 ">
          <button
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer ${
              projectType === "residential"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setProjectType("residential")}
          >
            🏡 Residential
          </button>
          <button
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer ${
              projectType === "commercial"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setProjectType("commercial")}
          >
            🏢 Commercial
          </button>
        </div>
      </div>

      {/* Add this new section for the standalone Localities filter */}
      <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Where do you want your property?
        </h3>
        <LocalitiesFilter
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          showTitle={false}
          className="px-4"
        />
      </div>

      <div className="flex flex-col lg:flex-row flex-1 gap-4">
        {/* Mobile Filter Button */}
        <button
          className="lg:hidden bg-blue-600 text-white px-4 py-2 rounded-md fixed bottom-4 right-4 z-50 shadow-lg flex items-center gap-2 transition-transform duration-300 active:scale-95"
          onClick={() => setShowFilters(true)}
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>

        {/* Mobile Overlay */}
        {showFilters && (
          <div
            className="fixed inset-0 bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setShowFilters(false)}
          ></div>
        )}

        {/* Mobile Filter Sidebar */}
        {showFilters && (
          <div className="fixed top-0 right-0 h-full w-4/5 max-w-md bg-none transform translate-x-0 mt-18 transition-transform duration-300 ease-in-out lg:hidden z-50 mb-50">
            <FilterSidebar
              selectedFilters={selectedFilters}
              removeFilter={removeFilter}
              clearFilters={clearFilters}
              budget={budget}
              handleBudgetChange={handleBudgetChange}
              budgetUnit={budgetUnit}
              handleBudgetUnitChange={handleBudgetUnitChange}
              area={area}
              handleAreaChange={handleAreaChange}
              areaUnit={areaUnit}
              handleAreaUnitChange={handleAreaUnitChange}
              openFilters={openFilters}
              setOpenFilters={setOpenFilters}
              handleFilterChange={handleFilterChange}
              isMobile={true}
              onClose={() => setShowFilters(false)}
            />
          </div>
        )}

        {/* Desktop View - Sidebar */}
        <div className="hidden lg:block lg:w-1/4">
          <FilterSidebar
            selectedFilters={selectedFilters}
            removeFilter={removeFilter}
            clearFilters={clearFilters}
            budget={budget}
            handleBudgetChange={handleBudgetChange}
            budgetUnit={budgetUnit}
            handleBudgetUnitChange={handleBudgetUnitChange}
            area={area}
            handleAreaChange={handleAreaChange}
            areaUnit={areaUnit}
            handleAreaUnitChange={handleAreaUnitChange}
            openFilters={openFilters}
            setOpenFilters={setOpenFilters}
            handleFilterChange={handleFilterChange}
          />
        </div>

        {/* Projects Section */}
        <div
          className={`w-full lg:w-3/4 ${showFilters ? "lg:ml-6" : "lg:ml-0"}`}
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />

          <div
            key={`projects-page-${currentPage}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[500px]"
          >
            {currentProjects.length > 0 ? (
              currentProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white p-4 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                  onClick={() => {
                    // Normalize developer name for URL
                    const normalizedDevName = project.developer
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    const url = `/project-details/${normalizedDevName}/${project.id}`;

                    // Open in a new tab
                    window.open(url, "_blank");
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                    onError={(e) => {
                      e.target.src = "/images/random-image.jpg";
                    }}
                  />
                  <div className="p-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.name}
                    </h3>
                    <p className="text-md font-medium text-green-600">
                      {project.price}
                    </p>
                    <div className="mt-2 space-y-2 text-gray-600 text-sm">
                      {project.bedrooms && (
                        <div className="flex items-center">
                          <Home className="w-4 h-4 mr-2" /> {project.bedrooms}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        {project.propertyType}
                      </div>
                      {project.projectStatus && (
                        <div className="flex items-center">
                          <Hammer className="w-4 h-4 mr-2" />
                          {project.projectStatus}
                        </div>
                      )}
                      {project.localities && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {project.localities}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Ruler className="w-4 h-4 mr-2" /> {project.area}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex flex-col items-center col-span-3 min-h-[300px] bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 text-lg mb-4 text-center leading-relaxed">
                  🚀{" "}
                  <span className="text-blue-600 font-semibold">
                    No properties matched your filters,
                  </span>{" "}
                  but{" "}
                  <span className="text-green-600 font-semibold">
                    great opportunities{" "}
                  </span>
                  are always around the corner!
                  <br />✨ Try adjusting your search or Contact Us for
                  personalized assistance. 📞🏡
                </p>

                <h3 className="text-lg font-semibold text-gray-700">
                  Contact Us
                </h3>
                <form
                  className="w-full max-w-sm"
                  onSubmit={handleContactSubmit}
                >
                  <input
                    type="text"
                    placeholder="Your Name*"
                    className="w-full p-2 border rounded mt-2"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone*"
                    className="w-full p-2 border rounded mt-2"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email (Optional)"
                    className="w-full p-2 border rounded mt-2"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                  />
                  <textarea
                    placeholder="Your Message (Optional)"
                    className="w-full p-2 border rounded mt-2"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                  ></textarea>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="mt-3 bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700"
                    >
                      Send via WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

export default FiltersWithProjects;
