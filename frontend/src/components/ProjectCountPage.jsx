import React, { useEffect, useState } from "react";

const ProjectCountPage = () => {
  const [projectCounts, setProjectCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "company",
    direction: "asc",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const residentialResponse = await fetch(
          "/data/residentialProjects.json"
        );
        const commercialResponse = await fetch("/data/commercialProjects.json");

        if (!residentialResponse.ok || !commercialResponse.ok) {
          throw new Error("Failed to fetch project data.");
        }

        const residentialJson = await residentialResponse.json();
        const commercialJson = await commercialResponse.json();

        const allProjects = [];

        // Loop through all companies in residential data
        for (const company in residentialJson) {
          const projects = residentialJson[company];
          projects.forEach((project) => {
            allProjects.push({
              ...project,
              company,
              type: "residential",
            });
          });
        }

        // Loop through all companies in commercial data
        for (const company in commercialJson) {
          const projects = commercialJson[company];
          projects.forEach((project) => {
            allProjects.push({
              ...project,
              company,
              type: "commercial",
            });
          });
        }

        const counts = {};

        allProjects.forEach(({ company, type }) => {
          if (!counts[company]) {
            counts[company] = { residential: 0, commercial: 0 };
          }
          if (type === "residential" || type === "commercial") {
            counts[company][type]++;
          }
        });

        const countArray = Object.keys(counts).map((company) => ({
          company,
          ...counts[company],
          total: counts[company].residential + counts[company].commercial,
        }));

        setProjectCounts(countArray);
      } catch (error) {
        console.error("Error fetching project data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedProjects = React.useMemo(() => {
    let sortableItems = [...projectCounts];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [projectCounts, sortConfig]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-lg text-gray-600">Loading project data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
            Error Loading Data
          </h2>
          <p className="text-gray-600 text-center">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Project Portfolio Summary
          </h1>
          <p className="text-gray-600 mt-2">
            Overview of residential and commercial projects by company
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("company")}
                  >
                    <div className="flex items-center">
                      Company
                      {sortConfig.key === "company" && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("residential")}
                  >
                    <div className="flex items-center">
                      Residential
                      {sortConfig.key === "residential" && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("commercial")}
                  >
                    <div className="flex items-center">
                      Commercial
                      {sortConfig.key === "commercial" && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("total")}
                  >
                    <div className="flex items-center">
                      Total Projects
                      {sortConfig.key === "total" && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedProjects.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No project data available
                    </td>
                  </tr>
                ) : (
                  sortedProjects.map(
                    ({ company, residential, commercial, total }) => (
                      <tr
                        key={company}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900 uppercase">
                            {company}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {residential}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {commercial}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {total}
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
          {sortedProjects.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{sortedProjects.length}</span> of{" "}
                <span className="font-medium">{sortedProjects.length}</span>{" "}
                companies
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Total Companies
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {sortedProjects.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Total Residential Projects
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {sortedProjects.reduce(
                (sum, company) => sum + company.residential,
                0
              )}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Total Commercial Projects
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {sortedProjects.reduce(
                (sum, company) => sum + company.commercial,
                0
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCountPage;
