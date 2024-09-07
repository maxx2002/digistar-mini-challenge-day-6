import { FiSearch } from "react-icons/fi";

interface SearchFieldProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({
  searchTerm,
  setSearchTerm,
}: SearchFieldProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center w-full px-4 py-3 bg-white rounded-lg shadow-sm">
      <FiSearch className="mr-2 text-2xl my-0.5 text-darkgray" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search Expenses..."
        className="w-full bg-white placeholder-darkgray focus:outline-none"
      />
    </div>
  );
};

export default SearchField;
