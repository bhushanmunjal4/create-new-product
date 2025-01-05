import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface FilterDropdownProps {
  onFilterChange: (filterOption: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = [
    "Product ID",
    "Name",
    "Original Price",
    "Discount Price",
    "Sale Price",
    "Product Type",
  ];

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between px-4 py-2 bg-[#1E252D] text-white rounded focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        Filter{" "}
        {isOpen ? (
          <IoIosArrowUp className="ml-2" />
        ) : (
          <IoIosArrowDown className="ml-2" />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul className="absolute mt-2 w-[200px] bg-[#2B323C] rounded-xl shadow-lg">
          {filterOptions.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 text-white cursor-pointer hover:bg-[#3A424D]"
              onClick={() => {
                onFilterChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
