import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterMenu({ filters, setFilters }) {
  const [open, setOpen] = useState(false);

  const toggle = (key) =>
    setFilters({ ...filters, [key]: !filters[key] });

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-gray-600 hover:text-black"
      >
        <FiSettings size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-3 w-40 text-sm"
          >
            {["files", "people", "chats", "lists"].map((key) => (
              <div key={key} className="flex items-center justify-between py-1">
                <span className="capitalize">{key}</span>
                <input
                  type="checkbox"
                  checked={filters[key]}
                  onChange={() => toggle(key)}
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
