interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type PageType = number | "left-ellipsis" | "right-ellipsis";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = (): PageType[] => {
    const pages: PageType[] = [];

    // Always show first page
    if (currentPage > 2) {
      pages.push(1);
    }

    // Left ellipsis
    if (currentPage > 3) {
      pages.push("left-ellipsis");
    }

    // Middle pages
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    // Right ellipsis
    if (currentPage < totalPages - 2) {
      pages.push("right-ellipsis");
    }

    // Always show last page
    if (currentPage < totalPages - 1) {
      pages.push(totalPages);
    }

    // Include page 1 and last page if they're not already there
    if (currentPage === 1) {
      pages.unshift(1);
    }
    if (currentPage === totalPages) {
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    return [...new Set(pages)]; // Ensure no duplicates
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border bg-transparent rounded-md disabled:hidden"
      >
        First
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border bg-transparent rounded-md disabled:hidden"
      >
        Prev
      </button>

      {getPageNumbers().map((page, idx) =>
        typeof page === "string" ? (
          <span key={idx} className="px-2 py-1">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(page)}
            className={`px-2 py-1 border ${
              currentPage === page
                ? "bg-[#6d2867] text-white"
                : "bg-transparent"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border bg-transparent rounded-md disabled:hidden"
      >
        Next
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border bg-transparent rounded-md disabled:hidden"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
