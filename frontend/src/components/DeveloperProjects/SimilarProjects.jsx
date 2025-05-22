import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Building, Hammer, Home, MapPin, Ruler } from "lucide-react";

const fetchProjectsData = async () => {
  const residentialJsonFile = `/data/residentialProjects.json`;
  const commercialJsonFile = `/data/commercialProjects.json`;
  try {
    const [residentialResponse, commercialResponse] = await Promise.all([
      fetch(residentialJsonFile),
      fetch(commercialJsonFile),
    ]);

    if (!residentialResponse.ok || !commercialResponse.ok) {
      throw new Error(`Failed to fetch projects data`);
    }

    const [residentialData, commercialData] = await Promise.all([
      residentialResponse.json(),
      commercialResponse.json(),
    ]);

    return { residential: residentialData, commercial: commercialData };
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

function SimilarProjects() {
  const { projectId } = useParams();
  const [allProjects, setAllProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [similarProjects, setSimilarProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const projectsData = await fetchProjectsData();

        if (
          !validateProjectsData(projectsData.residential) ||
          !validateProjectsData(projectsData.commercial)
        ) {
          console.error("Invalid projects data structure");
          return;
        }

        // Combine all projects
        const allProjectsCombined = [
          ...Object.values(projectsData.residential).flat(),
          ...Object.values(projectsData.commercial).flat(),
        ].map((proj) => ({
          id: proj.id || Math.random().toString(36).substr(2, 9),
          name: proj.name || "Unnamed Project",
          developer: proj.developer || "Unknown Developer",
          price: proj.price || "Price not available",
          propertyType: proj.propertyType || "Unknown Type",
          bedrooms: proj.bedrooms || "",
          projectStatus: proj.projectStatus || "",
          localities: proj.localities || "",
          area: proj.area || "",
          image: proj.image || "/images/default-project.jpg",
          budget: proj.budget || [0, 0],
          ...proj,
        }));

        setAllProjects(allProjectsCombined);

        // Find current project if projectId exists
        if (projectId) {
          const foundProject = allProjectsCombined.find(
            (p) => p.id === projectId
          );
          setCurrentProject(foundProject || null);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [projectId]);

  useEffect(() => {
    if (currentProject && allProjects.length > 0) {
      // Find similar projects based on current project properties
      const similar = findSimilarProjects(currentProject, allProjects);
      setSimilarProjects(similar.slice(0, 4)); // Get top 4 similar projects
    }
  }, [currentProject, allProjects]);

  const findSimilarProjects = (currentProject, allProjects) => {
    return allProjects
      .filter(
        (project) =>
          project.id !== currentProject.id && // Exclude current project
          (project.propertyType === currentProject.propertyType || // Same type
            project.localities === currentProject.localities || // Same area
            project.bedrooms === currentProject.bedrooms) // Same bedrooms
      )
      .sort((a, b) => {
        // Sort by similarity score
        let scoreA = 0;
        let scoreB = 0;

        if (a.propertyType === currentProject.propertyType) scoreA += 2;
        if (a.localities === currentProject.localities) scoreA += 1;
        if (a.bedrooms === currentProject.bedrooms) scoreA += 1;

        if (b.propertyType === currentProject.propertyType) scoreB += 2;
        if (b.localities === currentProject.localities) scoreB += 1;
        if (b.bedrooms === currentProject.bedrooms) scoreB += 1;

        return scoreB - scoreA; // Higher score first
      });
  };

  const normalizeForUrl = (str) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, ""); // Remove special characters
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-xl font-semibold">Loading similar projects...</div>
      </div>
    );
  }

  if (!currentProject && projectId) {
    return (
      <div className="text-center py-8 text-gray-600">Project not found</div>
    );
  }

  return (
    <div className="bg-gray-50 p-0 rounded-lg">
      {similarProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-4 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              onClick={() => {
                const projectName = project.name.split(" ")[0]; // Get the first name of the project
                const normalizedProjectName = normalizeForUrl(projectName);
                const url = `/project-details/${normalizedProjectName}/${project.id}`;
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
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {project.name}
                </h3>
                <p className="text-md font-medium text-green-600 mb-2">
                  {project.price}
                </p>
                <div className="space-y-2 text-gray-600 text-sm">
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
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-600">
          No similar projects found
        </div>
      )}
    </div>
  );
}

export default SimilarProjects;
