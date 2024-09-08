import { useState } from "react";
import Button from "../../../components/ui/Button";
import SearchField from "../../../components/ui/SearchField";
import { useDataContext } from "../../../contexts/DataContext";

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterCategory: string | null;
  setFilterCategory: (category: string | null) => void;
  filterDate: string | null;
  setFilterDate: (date: string | null) => void;
  filterFlowType: string | null;
  setFilterFlowType: (flowType: string | null) => void;
}

const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  filterDate,
  setFilterDate,
  filterFlowType,
  setFilterFlowType,
}: FiltersProps) => {
  const { categories } = useDataContext();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="flex items-center justify-between w-full mb-8 gap-x-4">
      <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="relative flex items-center justify-end gap-x-4 min-w-96">
        <div className="relative">
          <Button
            label="Category"
            variant={filterCategory ? "filter-active" : "filter"}
            onClick={() => toggleDropdown("category")}
          />
          {openDropdown === "category" && (
            <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 active-dropdown">
              <div className="py-1">
                <div
                  className={`block px-4 py-2 text-sm cursor-pointer hover:bg-gray ${
                    filterCategory === null ? "text-blue font-semibold" : ""
                  }`}
                  onClick={() => setFilterCategory(null)}
                >
                  All
                </div>
                {categories.map((category: { name: string }) => (
                  <div
                    key={category.name}
                    className={`block px-4 py-2 text-sm cursor-pointer hover:bg-gray ${
                      filterCategory === category.name
                        ? "text-blue font-semibold"
                        : ""
                    }`}
                    onClick={() => setFilterCategory(category.name)}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <Button
            label="Date"
            variant={filterDate ? "filter-active" : "filter"}
            onClick={() => toggleDropdown("date")}
          />
          {openDropdown === "date" && (
            <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 active-dropdown">
              <div className="p-4">
                <input
                  type="date"
                  className="block w-full px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={filterDate || ""}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <Button
            label="Flow Type"
            variant={filterFlowType ? "filter-active" : "filter"}
            onClick={() => toggleDropdown("flowType")}
          />
          {openDropdown === "flowType" && (
            <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 active-dropdown">
              <div className="py-1">
                <div
                  className={`block px-4 py-2 text-sm cursor-pointer hover:bg-gray ${
                    filterFlowType === null ? "text-blue font-semibold" : ""
                  }`}
                  onClick={() => setFilterFlowType(null)}
                >
                  All
                </div>
                <div
                  className={`block px-4 py-2 text-sm cursor-pointer hover:bg-gray ${
                    filterFlowType === "income" ? "text-blue font-semibold" : ""
                  }`}
                  onClick={() => setFilterFlowType("income")}
                >
                  Income
                </div>
                <div
                  className={`block px-4 py-2 text-sm cursor-pointer hover:bg-gray ${
                    filterFlowType === "outcome"
                      ? "text-blue font-semibold"
                      : ""
                  }`}
                  onClick={() => setFilterFlowType("outcome")}
                >
                  Outcome
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
