import { useState } from "react";
import data from "./data.json";
import SearchBar from "./components/SearchBar";
import Tabs from "./components/Tabs";
import FilterMenu from "./components/FilterMenu";
import ResultList from "./components/ResultList";

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    files: true,
    people: true,
    chats: false,
    lists: false,
  });

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // If current tab is hidden, switch to 'all'
    const currentTabEnabled =
      activeTab === "all" ||
      (activeTab === "files" && newFilters.files) ||
      (activeTab === "people" && newFilters.people) ||
      (activeTab === "chats" && newFilters.chats) ||
      (activeTab === "lists" && newFilters.lists);

    if (!currentTabEnabled) {
      setActiveTab("all");
    }
  };
  const [showResults, setShowResults] = useState(true); // show all data initially
  const [animating, setAnimating] = useState(false);

  const filtered = data.filter((item) => {
    if (query && !item.name.toLowerCase().includes(query.toLowerCase()))
      return false;
    if (item.type === "file" && !filters.files) return false;
    if (item.type === "person" && !filters.people) return false;
    if (item.type === "folder" && !filters.files) return false;
    return true;
  });

  const tabFiltered =
    activeTab === "all"
      ? filtered
      : activeTab === "files"
      ? filtered.filter((d) => d.type === "file" || d.type === "folder")
      : activeTab === "people"
      ? filtered.filter((d) => d.type === "person")
      : activeTab === "chats"
      ? filtered.filter((d) => d.type === "chat")
      : filtered.filter((d) => d.type === "list");

  const counts = {
    all: filtered.length,
    files: filtered.filter((d) => d.type === "file" || d.type === "folder")
      .length,
    people: filtered.filter((d) => d.type === "person").length,
    chats: filtered.filter((d) => d.type === "chat").length,
    lists: filtered.filter((d) => d.type === "list").length,
  };

  // Show results if showResults is true
  const handleSearch = (val) => {
    setQuery(val);
    setShowResults(true);
    setActiveTab("all");
  };

  const handleClear = () => {
    setAnimating(true);
    setTimeout(() => {
      setShowResults(false);
      setQuery("");
      setActiveTab("all");
      setAnimating(false);
    }, 350); // duration for smooth animation
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between">
          <SearchBar
            query={query}
            setQuery={handleSearch}
            clear={handleClear}
          />
        </div>
        <div
          className={
            showResults
              ? `transition-all duration-350`
              : animating
              ? `opacity-0 max-h-0 transition-all duration-350`
              : `hidden`
          }
        >
          {showResults && (
            <>
              <Tabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                counts={counts}
                filters={filters}
                filterMenu={
                  <FilterMenu
                    filters={filters}
                    setFilters={handleFilterChange}
                    settingsOpen={settingsOpen}
                    setSettingsOpen={setSettingsOpen}
                  />
                }
              />
              <ResultList
                data={tabFiltered}
                query={query}
                settingsOpen={settingsOpen}
              />
              {/* <div className="flex justify-end px-4 pb-2">
                <button
                  className="text-sm text-gray-500 underline"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
