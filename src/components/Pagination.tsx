import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="text-white flex items-center space-x-4">
      <span>
        {totalItems === 0 ? `0 of 0` : `${currentPage} of ${totalPages}`}
      </span>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        <IoIosArrowBack />
      </button>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
