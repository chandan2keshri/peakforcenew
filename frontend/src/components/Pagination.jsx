// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// const Pagination = ({ currentPage, totalPages, paginate }) => {
//   if (!totalPages || totalPages < 1) return null; // Prevent rendering if no pages exist

//   const handlePageChange = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       paginate(pageNumber);
//       // window.scrollTo(0, 0); // Uncomment this line to scroll to top on page change
//     }
//   };

//   return (
//     <div className="flex justify-center items-center space-x-2 my-4 text-sm">
//       {/* Previous Button */}
//       <button
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 transition 
//         ${
//           currentPage === 1
//             ? "cursor-not-allowed opacity-50"
//             : "hover:bg-gray-100 cursor-pointer"
//         }`}
//       >
//         <FaArrowLeft className="text-gray-500 text-xs" /> Prev
//       </button>

//       {/* Page Numbers */}
//       <div className="flex space-x-1">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => handlePageChange(i + 1)}
//             className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all border 
//             ${
//               currentPage === i + 1
//                 ? "bg-blue-600 text-white border-blue-600"
//                 : "text-gray-700 border-gray-300 hover:bg-gray-100 cursor-pointer"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>

//       {/* Next Button */}
//       <button
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 transition 
//         ${
//           currentPage === totalPages
//             ? "cursor-not-allowed opacity-50"
//             : "hover:bg-gray-100 cursor-pointer"
//         }`}
//       >
//         Next <FaArrowRight className="text-gray-500 text-xs" />
//       </button>
//     </div>
//   );
// };

// export default Pagination;





import React from 'react';
import { FaArrowLeft, FaArrowRight, FaEllipsisH } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  if (!totalPages || totalPages < 1) return null; // Prevent rendering if no pages exist

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      paginate(pageNumber);
      // window.scrollTo(0, 0); // Uncomment this line to scroll to top on page change
    }
  };

  const generatePageNumbers = () => {
    const maxVisiblePages = 5; // Maximum number of page numbers to display
    const half = Math.floor(maxVisiblePages / 2);

    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = Math.min(start + maxVisiblePages - 1, totalPages);
    } else if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed
    if (start > 1) {
      if (start > 2) {
        pages.unshift('...');
      }
      pages.unshift(1);
    }
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center items-center space-x-2 my-4 text-sm">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 transition 
        ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100 cursor-pointer"
        }`}
      >
        <FaArrowLeft className="text-gray-500 text-xs" /> Prev
      </button>

      {/* Page Numbers */}
      <div className="flex space-x-1">
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all border 
            ${
              currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : typeof page === 'number'
                ? "text-gray-700 border-gray-300 hover:bg-gray-100 cursor-pointer"
                : "cursor-default"
            }`}
            disabled={typeof page !== 'number'}
            aria-label={typeof page === 'number' ? `Page ${page}` : 'More pages'}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {typeof page === 'number' ? page : <FaEllipsisH className="text-gray-500" />}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 transition 
        ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100 cursor-pointer"
        }`}
      >
        Next <FaArrowRight className="text-gray-500 text-xs" />
      </button>
    </div>
  );
};

export default Pagination;