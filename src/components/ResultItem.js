import { useState } from "react";
import { FiFile, FiFolder } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ResultItem({ item, query }) {
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
      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md cursor-pointer relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {item.type === "person" && (
        <img
          src={item.avatar}
          alt={item.name}
          className="w-8 h-8 rounded-full"
        />
      )}
      {item.type === "file" && <FiFile className="text-gray-500" />}
      {item.type === "folder" && <FiFolder className="text-gray-500" />}

      <div>
        <div className="font-medium">{highlight(item.name)}</div>
        <div className="text-xs text-gray-500">
          {item.status || item.details}
        </div>
      </div>

      {/* Show icons on hover for all items */}
      {hovered && (
        <div className="absolute right-4 flex gap-2 items-center z-10">
          <button
            title="Open in new tab"
            onClick={handleOpenTab}
            className="p-1 rounded-full bg-white shadow border border-gray-200 hover:bg-gray-100 focus:outline-none"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path d="M14 3h7v7" />
              <path d="M5 19a9 9 0 0 1 9-9h7" />
            </svg>
          </button>
          <button
            title="Copy link"
            onClick={handleCopy}
            className="p-1 rounded-full bg-white shadow border border-gray-200 hover:bg-gray-100 focus:outline-none"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path d="M10 13a5 5 0 0 1 7 7l-3 3a5 5 0 0 1-7-7l3-3" />
            </svg>
          </button>
          {copied && (
            <span className="ml-2 px-2 py-1 text-xs rounded bg-green-100 text-green-700 border border-green-200 animate-fade-in">
              Link copied!
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
