import { useState } from "react";
import {
  FiSettings,
  FiFile,
  FiUsers,
  FiMessageSquare,
  FiList,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterMenu({
  filters,
  setFilters,
  settingsOpen,
  setSettingsOpen,
}) {
  // Use controlled open state from parent
  // If settingsOpen/setSettingsOpen are passed, use them, else fallback to local state
  const [localOpen, setLocalOpen] = useState(false);
  const open = typeof settingsOpen === "boolean" ? settingsOpen : localOpen;
  const setOpen = setSettingsOpen || setLocalOpen;

  const handleToggle = (key) => {
    const newFilters = { ...filters, [key]: !filters[key] };
    console.log("Toggling:", key, "New state:", newFilters);
    setFilters(newFilters);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-gray-600 hover:text-black"
        aria-label="Settings"
      >
        <FiSettings size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-3 w-40 text-sm z-50"
          >
            {[
              { key: "files", icon: FiFile },
              { key: "people", icon: FiUsers },
              { key: "chats", icon: FiMessageSquare },
              { key: "lists", icon: FiList },
            ].map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="flex items-center justify-between py-1 group"
              >
                <div className="flex items-center space-x-2">
                  <Icon size={16} className="text-gray-500" />
                  <span className="capitalize">{key}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {/* <FiExternalLink
                    size={14}
                    className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  /> */}
                  <label className="relative inline-block w-9 h-5 cursor-pointer">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={filters[key]}
                      onChange={() => handleToggle(key)}
                    />
                    <div
                      className={`absolute inset-0 rounded-full transition-colors duration-200 ease-in-out ${
                        filters[key] ? "bg-black" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                          filters[key] ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
