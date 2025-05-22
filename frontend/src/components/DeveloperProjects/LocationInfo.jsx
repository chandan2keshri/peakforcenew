import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";

const fetchProjectDetails = async (projectType, developerName, projectId) => {
  try {
    const response = await fetch(`/data/${projectType}Projects.json`);
    if (!response.ok)
      throw new Error(`Failed to fetch ${projectType} projects`);
    const data = await response.json();

    // Try exact developer name match first
    if (data[developerName]) {
      const project = data[developerName].find((p) => p.id === projectId);
      if (project) return { ...project, developer: developerName };
    }

    // Try case-insensitive match
    const normalizedSearch = developerName.toLowerCase().replace(/[-\s]/g, "");
    for (const dev in data) {
      const normalizedDev = dev.toLowerCase().replace(/[-\s]/g, "");
      if (normalizedDev === normalizedSearch) {
        const project = data[dev].find((p) => p.id === projectId);
        if (project) return { ...project, developer: dev };
      }
    }

    // Search all projects by ID as fallback
    for (const dev in data) {
      const project = data[dev].find((p) => p.id === projectId);
      if (project) return { ...project, developer: dev };
    }

    return null;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

const LocationInfo = () => {
  const { developerName, projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Try both residential and commercial projects
        const projectTypes = ["residential", "commercial"];
        let projectData = null;

        for (const type of projectTypes) {
          try {
            projectData = await fetchProjectDetails(
              type,
              developerName,
              projectId
            );
            if (projectData) break;
          } catch (e) {
            console.warn(`Error loading ${type} projects:`, e);
          }
        }

        if (!projectData) {
          setError(`Project not found: ${developerName} - ${projectId}`);
          return;
        }

        // Normalize the data structure
        const normalizedProject = {
          ...projectData,
          // Use 'localities' if 'location' doesn't exist
          location: projectData.location || projectData.localities || "",
          // Handle both 'image' and 'locationImage' fields
          locationImage:
            projectData.locationImage ||
            (projectData.image
              ? [projectData.image]
              : ["/images/default-map.jpg"]),
          // Ensure nearbyLocations exists
          nearbyLocations: projectData.nearbyLocations || [],
        };

        setProject(normalizedProject);
      } catch (error) {
        console.error("Error loading project:", error);
        setError("Failed to load project details");
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [developerName, projectId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold">
          Loading location information...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  // Check if we have location data to display
  const hasLocationData =
    project?.location &&
    project?.locationImage?.length > 0 &&
    project.location.trim() !== "";

  if (!hasLocationData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {project?.name || "This project"}
          </h2>
          <p className="text-gray-600 mb-6">
            Location details are not currently available.
          </p>
          <button
            onClick={() => setShowPopup(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Contact Us for Location Information
          </button>
        </div>
        {showPopup && <ContactUsPopup onClose={() => setShowPopup(false)} />}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-0">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Location Map Section */}
        <div className="lg:w-1/2">
          {" "}
          {/* Reduced width here */}
          <div className="relative rounded-xl overflow-hidden shadow-md bg-gray-50 border border-gray-200">
            <img
              src={project.locationImage[0]}
              alt={`Location map of ${project.name}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/random-image.jpg";
              }}
              className="w-full h-85 object-cover" // Reduced height here
            />
          </div>
        </div>

        {/* Nearby Locations Section */}
        <div className="lg:w-1/2">
          {" "}
          {/* Reduced width here */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 h-full flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Nearby Locations
              </h2>
            </div>

            {project.nearbyLocations.length > 0 ? (
              <div className="flex-1 overflow-y-auto max-h-72 px-4 py-2">
                <ul className="divide-y divide-gray-100">
                  {project.nearbyLocations.map((location, index) => (
                    <li key={index} className="py-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-700">
                            {location}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-6">
                <p className="text-gray-500 text-center italic">
                  Nearby amenities information coming soon
                </p>
              </div>
            )}

            <div className="p-4 border-t border-gray-200">
              <a
                href="https://maps.app.goo.gl/pee4pLdtF7Ygo9K7A"
                target="_blank"
              >
                <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Get Directions
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
