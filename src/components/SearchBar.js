import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SearchBar({ query, setQuery, clear, isLoading }) {
  const [showQuickAccess, setShowQuickAccess] = useState(false);

  const handleClear = () => {
    clear();
    setShowQuickAccess(true); // show quick access after clearing
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value) {
      setShowQuickAccess(false); // hide quick access while typing
    }
  };

  return (
    <div className="px-5 py-6 w-full">
      <div className="flex items-center gap-2">
        {isLoading ? (
          <AiOutlineLoading3Quarters className="text-gray-500 text-2xl animate-spin" />
        ) : (
          <FiSearch className="text-gray-400 text-2xl" />
        )}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Searching is easier"
          className="flex-1 outline-none bg-transparent text-xl font-semibold"
        />
        {query && (
          <button
            onClick={handleClear}
            className="text-sm font-semibold text-gray-900 underline underline-offset-1"
          >
            Clear
          </button>
        )}
        {showQuickAccess && !query && (
          <div>
            <h3 className="text-sm mb-3 text-gray-600 my-2">
              <span className="px-2 py-1 mx-2 border border-gray-400 rounded-lg">
                S
              </span>
              quick access
            </h3>
          </div>
        )}
      </div>

      {/* Quick Access Section */}
    </div>
  );
}
