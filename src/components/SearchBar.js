import { FiSearch } from "react-icons/fi";

export default function SearchBar({ query, setQuery, clear }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b">
      <FiSearch className="text-gray-500" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="flex-1 outline-none bg-transparent"
      />
      {query && (
        <button onClick={clear} className="text-sm text-blue-600">
          Clear
        </button>
      )}
    </div>
  );
}
