import { useState } from "react";
import data from "./data.json";
import SearchBar from "./components/SearchBar";
import Tabs from "./components/Tabs";
import FilterMenu from "./components/FilterMenu";
import ResultList from "./components/ResultList";
import { AnimatePresence, motion } from "framer-motion";

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
  const [isLoading, setIsLoading] = useState(false);

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
    if (val) {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } else {
      setIsLoading(false);
    }
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
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <SearchBar
            query={query}
            setQuery={handleSearch}
            clear={handleClear}
            isLoading={isLoading}
          />
        </div>
        <AnimatePresence>
          {showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
            >
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
                isLoading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
