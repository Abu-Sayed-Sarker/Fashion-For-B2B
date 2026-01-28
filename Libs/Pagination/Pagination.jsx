import { ArrowLeft } from "lucide-react";
import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  usersPerPage = 4,
  pageWindowSize = 3,
}) => {
  // Calculate the page window start and end
  const currentWindowStart =
    Math.floor((currentPage - 1) / pageWindowSize) * pageWindowSize + 1;
  const currentWindowEnd = Math.min(
    currentWindowStart + pageWindowSize - 1,
    totalPages
  );

  return (
    <div className="flex items-center justify-end mt-6 space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        className="h-10 w-10 flex items-center justify-center hover:bg-black hover:text-white hover:shadow-[_0_0_20px_#000000] duration-500 transition-all ease-in-out rounded-full border border-black/25 hover:border-none"
      >
        <ArrowLeft />
      </button>

      {/* First Page Button and Ellipsis */}
      {currentWindowStart > 1 && (
        <>
          <button
            onClick={() => setCurrentPage(1)}
            className="h-10 w-10 text-center rounded-full border"
          >
            01
          </button>
          <span className="text-gray-400 px-2">•••</span>
        </>
      )}

      {/* Page Number Buttons */}
      {Array.from(
        { length: currentWindowEnd - currentWindowStart + 1 },
        (_, i) => {
          const pageNum = currentWindowStart + i;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`h-10 w-10 text-center rounded-full ${
                currentPage === pageNum
                  ? "bg-black text-white shadow-[_0_0_20px_#000000] duration-500 transition-all ease-in-out"
                  : "border"
              }`}
            >
              {String(pageNum).padStart(2, "0")}
            </button>
          );
        }
      )}

      {/* Ellipsis and Last Page Button */}
      {currentWindowEnd < totalPages && (
        <>
          <span className="text-gray-400 px-2">•••</span>
          <button
            onClick={() => setCurrentPage(totalPages)}
            className="h-10 w-10 text-center rounded-full border"
          >
            {String(totalPages).padStart(2, "0")}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        className="h-10 w-10 flex items-center justify-center hover:bg-black hover:text-white hover:shadow-[_0_0_20px_#000000] duration-500 transition-all ease-in-out border border-black/25 hover:border-none rounded-full"
      >
        <ArrowLeft className="rotate-180" />
      </button>
    </div>
  );
};

export default Pagination;
