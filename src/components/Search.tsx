import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

interface SearchboxProps {
  onSearch: (onSearch: string) => void;
}

const SearchBox: React.FC<SearchboxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex items-center px-4 py-2 bg-[#1E252D] text-white rounded">
      <input
        type="text"
        placeholder="Search"
        className="flex-grow outline-none bg-transparent w-[60px]"
        value={query}
        onChange={handleSearch}
      />
      <IoSearch className="mr-2" />
    </div>
  );
};

export default SearchBox;
