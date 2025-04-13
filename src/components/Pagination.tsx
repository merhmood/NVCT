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

    // Middle pages
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
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
    <div className="flex flex-wrap gap-0.5 justify-center mt-4">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border bg-transparent rounded-bl-md rounded-tl-md disabled:cursor-default"
      >
        First
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border bg-transparent disabled:cursor-default"
      >
        Prev
      </button>

      {getPageNumbers().map(
        (page, idx) =>
          currentPage === page && (
            <button
              key={idx}
              onClick={() => onPageChange(page as number)}
              className={`px-3 py-1 border bg-[#6d2867] text-white`}
            >
              {page}
            </button>
          )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border bg-transparent disabled:cursor-default"
      >
        Next
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border bg-transparent rounded-r-md rounded-br-md disabled:cursor-default"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
