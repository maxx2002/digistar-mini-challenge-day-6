import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchField: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center w-full max-w-md px-4 py-3 bg-white rounded-lg shadow-sm">
      <FiSearch className="mr-2 text-lg text-darkgray" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="w-full text-gray-700 bg-white placeholder-darkgray focus:outline-none"
      />
    </div>
  );
};

export default SearchField;
