import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import ContactUsPopup from "../ContactUsPopup";

// Fetch the project specifications from JSON dynamically
const fetchProjectDetails = async (projectType, developerName, projectId) => {
  try {
    const response = await fetch(`/data/${projectType}Projects.json`);
    if (!response.ok)
      throw new Error(`Failed to fetch ${projectType}Projects.json`);
    const data = await response.json();

    // 1. Try exact developer name match
    if (data[developerName]) {
      const project = data[developerName].find((p) => p.id === projectId);
      if (project) return { ...project, developer: developerName };
    }

    // 2. Try case-insensitive match (remove hyphens/spaces)
    const normalizedSearch = developerName.toLowerCase().replace(/[-\s]/g, "");
    for (const dev in data) {
      const normalizedDev = dev.toLowerCase().replace(/[-\s]/g, "");
      if (normalizedDev === normalizedSearch) {
        const project = data[dev].find((p) => p.id === projectId);
        if (project) return { ...project, developer: dev };
      }
    }

    // 3. Search all projects as fallback
    for (const dev in data) {
      const project = data[dev].find((p) => p.id === projectId);
      if (project) return { ...project, developer: dev };
    }

    return null;
  } catch (error) {
    console.error("Error loading project details:", error);
    throw error;
  }
};

const Specifications = () => {
  const { developerName, projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true);
        setError(null);

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
            console.warn(`Failed to load ${type} projects:`, e);
          }
        }

        if (!projectData) {
          setError(
            `Project not found. Developer: ${developerName}, ID: ${projectId}`
          );
          return;
        }

        setProject(projectData);
      } catch (error) {
        console.error("Error loading project:", error);
        setError(`Failed to load project details: ${error.message}`);
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
          Loading project specifications...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-red-600">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (
    !project ||
    !project.specifications ||
    project.specifications.length === 0
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-gray-100 p-6 rounded-2xl shadow-lg">
          <p className="text-gray-600 text-lg">
            No specifications found for this project.
          </p>
          <button
            onClick={() => setShowPopup(true)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Contact Us for More Details
          </button>

          {showPopup && (
            <div className="mt-8">
              <ContactUsPopup onClose={() => setShowPopup(false)} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-0">
      <div className="mt-6">
        <div className="flex flex-wrap gap-2">
          {project.specifications.map((spec, index) => (
            <span
              key={index}
              className="text-gray-700 px-3 py-1 rounded-md text-sm inline-flex items-center border border-gray-200 bg-gray-200"
            >
              <CheckCircle className="text-green-500 mr-1" size={14} />
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Specifications;
