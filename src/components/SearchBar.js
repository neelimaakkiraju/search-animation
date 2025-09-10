import { FiSearch } from "react-icons/fi";

export default function SearchBar({ query, setQuery, clear }) {
  return (
    <div className="px-5 py-6">
      <div className="flex items-center gap-2">
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="flex-1 outline-none bg-transparent"
        />
        {query && (
          <button
            onClick={clear}
            className="text-sm text-black-600 underline underline-offset-1"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
