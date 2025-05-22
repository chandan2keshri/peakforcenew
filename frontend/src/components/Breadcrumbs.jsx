import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean); // Remove empty segments

  return (
    <nav className="p-4 sm:p-6 text-gray-600 text-sm overflow-x-auto">
      <ul className="flex items-center gap-2 whitespace-nowrap">
        {/* Home Link */}
        <li>
          <Link
            to="/"
            className="hover:text-blue-600 transition uppercase font-medium"
          >
            Home
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          // Construct breadcrumb path dynamically
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const formattedSegment =
            segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

          return (
            <li key={path} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              {!isLast ? (
                <Link
                  to={path}
                  className="hover:text-blue-600 transition uppercase font-medium"
                >
                  {formattedSegment}
                </Link>
              ) : (
                <span className="text-gray-900 font-semibold uppercase">
                  {formattedSegment}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
