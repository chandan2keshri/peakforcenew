import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  Home,
  ShieldCheck,
  MapPin,
  Ruler,
  Building,
  Hammer,
  Bed,
  CheckCircle,
} from "lucide-react";
import EnquiryForm from "../../components/EnquiryForm";
import ImageCarousel from "../../components/DeveloperProjects/ImageCarousel";
import Breadcrumbs from "../../components/Breadcrumbs";
import SpecificationMenu from "../../components/DeveloperProjects/SpecificationMenu";

const fetchProjectDetails = async (projectType, developerName, projectId) => {
  try {
    const response = await fetch(`/data/${projectType}Projects.json`);
    if (!response.ok)
      throw new Error(`Failed to fetch ${projectType}Projects.json`);
    const data = await response.json();

    // 1. First try exact developer name match
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

function ProjectDetails() {
  const { developerName, projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // 1. Disable browser's automatic scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  // 2. Initial scroll to top (runs before paint)
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 3. Scroll management during loading and after content loads
  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && !isLoading && project) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setHasScrolled(true);
      }
    };

    handleScroll();
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('resize', handleScroll);
    };
  }, [isLoading, project, hasScrolled]);

  // 4. Additional safeguard against scroll jumping
  useEffect(() => {
    if (!isLoading && project && !hasScrolled) {
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        setHasScrolled(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, project, hasScrolled]);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setHasScrolled(false);

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

        projectData = {
          id: projectData.id,
          name: projectData.name || "Unnamed Project",
          developer: projectData.developer,
          price: projectData.price || "Price not available",
          propertyType: projectData.propertyType || "Unknown Type",
          description:
            projectData.description ||
            `${projectData.name} is located in ${
              projectData.localities || "a prime location"
            }`,
          localities: projectData.localities || "Location not specified",
          area: projectData.area || "Area not specified",
          amenities: projectData.amenities || [
            "Power Backup",
            "Parking",
            "Security",
          ],
          images: projectData.images || [
            projectData.image || "/images/default-project.jpg",
          ],
          projectStatus: projectData.projectStatus || "Status not available",
          bedrooms: projectData.bedrooms || "N/A",
        };

        setProject(projectData);
      } catch (error) {
        console.error("Error loading project:", error);
        setError(`Failed to load project details: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [developerName, projectId, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold">Loading project details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-red-600">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold">Project not found</div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen p-4 lg:p-8 mt-13">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
          <Breadcrumbs />

          <div className="p-6">
            <h1 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text drop-shadow-md">
              {project.name}
            </h1>

            <p className="text-xl font-semibold text-green-600 mt-2">
              {project.price}
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              {project.bedrooms && (
                <span className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  <Home className="w-4 h-4 mr-2" /> {project.bedrooms}
                </span>
              )}
              <span className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                <Building className="w-4 h-4 mr-2" /> {project.propertyType}
              </span>
              {project.projectStatus && (
                <span className="flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                  <Hammer className="w-4 h-4 mr-2" /> {project.projectStatus}
                </span>
              )}
              <span className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <ShieldCheck className="w-4 h-4 mr-2" /> RERA Approved
              </span>
            </div>
          </div>

          <ImageCarousel project={project} />

          <SpecificationMenu project={project} />

          <div className="mt-8 flex justify-center">
            <EnquiryForm
              isOpenByDefault={false}
              buttonPosition={{ bottom: "5rem", right: "2rem" }}
            />
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default ProjectDetails;