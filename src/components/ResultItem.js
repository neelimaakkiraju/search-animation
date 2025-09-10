import { useState } from "react";
import { FiFile, FiFolder, FiExternalLink, FiLink } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ResultItem(props) {
  const { item, query, settingsOpen } = props;
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const highlight = (text) =>
    text.split(new RegExp(`(${query})`, "gi")).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200">
          {part}
        </mark>
      ) : (
        part
      )
    );

  // Use a generic link for all items
  const itemUrl =
    item.url || item.profileUrl || `https://app.com/${item.id || item.name}`;

  const handleOpenTab = (e) => {
    e.stopPropagation();
    window.open(itemUrl, "_blank");
  };

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(itemUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 p-5 rounded-md cursor-pointer relative ${
        !settingsOpen ? "hover:bg-gray-50" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {item.type === "person" && (
        <span className="relative w-8 h-8 block">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-8 h-8 rounded-md"
          />
          {item.status && (
            <span
              className={`absolute bottom-0  right-0 w-3 h-3 rounded-full border-2 border-white ${
                item.status.toLowerCase().includes("active")
                  ? "bg-green-400"
                  : "bg-yellow-400"
              }`}
            />
          )}
        </span>
      )}
      {item.type === "file" && (
        <span className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100">
          <FiFile className="text-gray-500 w-5 h-5" />
        </span>
      )}
      {item.type === "folder" && (
        <span className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100">
          <FiFolder className="text-gray-500 w-5 h-5" />
        </span>
      )}

      <div>
        <div className="font-medium">{highlight(item.name)}</div>
        <div className="text-xs text-gray-500">
          {item.status || item.details}
        </div>
      </div>

      {/* Show icons on hover for all items, but hide if settingsOpen */}
      {hovered && !settingsOpen && (
        <>
          <div className="absolute right-4 flex gap-2 items-center z-10">
            <div className="relative">
              <button
                title="Copy link"
                onClick={handleCopy}
                className="p-1.5 rounded-full bg-white shadow border border-gray-200 hover:bg-gray-100 focus:outline-none group"
              >
                <FiLink className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
              </button>
              {copied && (
                <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-20">
                  <span className="px-3 py-1 text-xs rounded-full bg-gray-900 text-white shadow-sm animate-fade-in whitespace-nowrap">
                    Link copied!
                  </span>
                </div>
              )}
            </div>
            <button
              title="Open in new tab"
              onClick={handleOpenTab}
              className="p-1.5 rounded-full bg-white shadow border border-gray-200 hover:bg-gray-100 focus:outline-none group"
            >
              <FiExternalLink className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
