import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Ruler, Building, Bed, CheckCircle } from "lucide-react";
import ContactUsPopup from "../ContactUsPopup";
import { MdBusiness } from "react-icons/md";

const ProjectOverview = ({ project }) => {
  const [showPopup, setShowPopup] = React.useState(false);

  return (
    <div className="p-0">
      <p className="text-gray-600 mb-6">{project.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-start p-4 border border-gray-100 rounded-lg bg-gray-200">
          <FaMapMarkerAlt className="text-blue-500 text-xl mt-1 mr-3" />
          <div>
            <h3 className="font-medium text-gray-700">Location</h3>
            <p className="text-gray-500">{project.localities}</p>
          </div>
        </div>
        <div className="flex items-start p-4 border border-gray-100 rounded-lg bg-gray-200">
          <Ruler className="text-purple-500 text-xl mt-1 mr-3" />
          <div>
            <h3 className="font-medium text-gray-700">Area</h3>
            <p className="text-gray-500">{project.area}</p>
          </div>
        </div>
        <div className="flex items-start p-4 border border-gray-100 rounded-lg bg-gray-200">
          <Building className="text-indigo-500 text-xl mt-1 mr-3" />
          <div>
            <h3 className="font-medium text-gray-700">Property Type</h3>
            <p className="text-gray-500">{project.propertyType}</p>
          </div>
        </div>
        {project.projectStatus && (
          <div className="flex items-start p-4 border border-gray-100 rounded-lg bg-gray-200">
            <MdBusiness className="text-amber-500 text-xl mt-1 mr-3" />
            <div>
              <h3 className="font-medium text-gray-700">Status</h3>
              <p className="text-gray-500">{project.projectStatus}</p>
            </div>
          </div>
        )}
        {project.bedrooms && (
          <div className="flex items-start p-4 border border-gray-100 rounded-lg bg-gray-200">
            <Bed className="text-red-500 text-xl mt-1 mr-3" />
            <div>
              <h3 className="font-medium text-gray-700">Bedrooms</h3>
              <p className="text-gray-500">{project.bedrooms}</p>
            </div>
          </div>
        )}
      </div>
      {project.amenities && project.amenities.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-3">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {project.amenities.map((amenity, index) => (
              <span
                key={index}
                className="text-gray-700 px-3 py-1 rounded-md text-sm inline-flex items-center border border-gray-200 bg-gray-200"
              >
                <CheckCircle className="text-green-500 mr-1" size={14} />
                {amenity}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer mt-5"
          onClick={() => setShowPopup(true)}
        >
          Inquire Now!
        </button>
        {showPopup && <ContactUsPopup onClose={() => setShowPopup(false)} />}
      </div>
    </div>
  );
};

export default ProjectOverview;
