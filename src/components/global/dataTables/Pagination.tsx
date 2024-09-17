import React from "react";
import { range } from "lodash";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = (): (number | string)[] => {
    const maxPages = 3;
    const half = Math.floor(maxPages / 2);
    let startPage = Math.max(1, currentPage - half);
    let endPage = Math.min(totalPages, currentPage + half);

    if (currentPage - half <= 1) {
      endPage = Math.min(maxPages, totalPages);
    }

    if (currentPage + half >= totalPages) {
      startPage = Math.max(totalPages - maxPages + 1, 1);
    }

    const pages: (number | string)[] = range(startPage, endPage + 1);

    if (startPage > 1) pages.unshift("...");
    if (endPage < totalPages) pages.push("...");

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        className={`px-3 py-1 border rounded-lg ${
          currentPage === 1
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-black text-white border-white hover:bg-gray-500"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Previous
      </button>

      {pageNumbers().map((page, index) =>
        page === "..." ? (
          <span
            key={index}
            className="px-3 py-1 border rounded-lg text-gray-600"
          >
            ...
          </span>
        ) : (
          <button
            key={index}
            className={`px-3 py-1 border rounded-lg ${
              page === currentPage
                ? "bg-black text-white border-white"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </button>
        )
      )}

      <button
        className={`px-3 py-1 border rounded-lg ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-black text-white border-white hover:bg-gray-500"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
