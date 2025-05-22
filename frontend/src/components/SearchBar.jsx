import React, { useState, useEffect, useMemo } from "react";
import VoiceSearchButton from "./VoiceSearchButton";
import { debounce } from "lodash";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPages, setFilteredPages] = useState([]);
  const [allPages, setAllPages] = useState([]);

  useEffect(() => {
    fetch("data/searchData.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch pages data");
        return response.json();
      })
      .then((data) => setAllPages(data))
      .catch((error) => console.error("Error loading pages:", error));
  }, []);

  // Debounced filtering logic
  const debouncedFilter = useMemo(
    () =>
      debounce((query) => {
        if (query.length > 0) {
          const queryLower = query.toLowerCase();
          const results = allPages.filter((page) => {
            const nameMatch = page.name.toLowerCase().includes(queryLower);
            const keywordMatch =
              page.keywords &&
              page.keywords.some((kw) => kw.toLowerCase().includes(queryLower));
            return nameMatch || keywordMatch;
          });
          setFilteredPages(results);
        } else {
          setFilteredPages([]);
        }
      }, 300),
    [allPages]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedFilter(value);
  };

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 md:px-0 z-20 flex justify-center">
        <div className="bg-white p-0 rounded-full flex items-center space-x-3 w-full max-w-lg md:max-w-xl shadow-lg relative">
          <input
            type="text"
            placeholder="Search by location, property type..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full px-4 py-3 text-gray-700 bg-white rounded-full focus:outline-none transition"
          />
          <VoiceSearchButton
            setSearchQuery={(text) => {
              setSearchQuery(text);
              debouncedFilter(text);
            }}
          />
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {filteredPages.length > 0 ? (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6.5 w-full max-w-lg md:max-w-xl bg-white shadow-lg rounded-lg overflow-y-auto max-h-60 z-30">
          <ul className="divide-y divide-gray-200">
            {filteredPages.map((page, index) => (
              <li key={index} className="hover:bg-gray-100">
                <a
                  href={page.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-gray-800 hover:text-blue-600"
                  onClick={() => {
                    setSearchQuery("");
                    setFilteredPages([]);
                  }}
                >
                  {page.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : searchQuery.length > 0 ? (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6.5 w-full max-w-lg md:max-w-xl bg-white shadow-lg rounded-lg overflow-hidden z-30">
          <div className="px-4 py-3 text-gray-600">No results found</div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
