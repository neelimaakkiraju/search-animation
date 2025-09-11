import {
  FiGrid,
  FiFile,
  FiUsers,
  FiMessageSquare,
  FiList,
} from "react-icons/fi";

export default function Tabs({
  activeTab,
  setActiveTab,
  counts,
  filterMenu,
  filters,
}) {
  const availableTabs = [
    {
      id: "all",
      label: "All",
      count: counts.all,
      alwaysShow: true,
      icon: FiGrid,
    },
    {
      id: "files",
      label: "Files",
      count: counts.files,
      showIf: "files",
      icon: FiFile,
    },
    {
      id: "people",
      label: "People",
      count: counts.people,
      showIf: "people",
      icon: FiUsers,
    },
    {
      id: "chats",
      label: "Chats",
      count: counts.chats,
      showIf: "chats",
      icon: FiMessageSquare,
    },
    {
      id: "lists",
      label: "Lists",
      count: counts.lists,
      showIf: "lists",
      icon: FiList,
    },
  ];

  const tabs = availableTabs.filter(
    (tab) => tab.alwaysShow || (tab.showIf && filters[tab.showIf])
  );

  return (
    <div className="flex px-4 space-x-6 border-b text-sm items-center justify-between">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative py-3 flex items-center space-x-1 group ${
              activeTab === tab.id
                ? "font-semibold text-black"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <tab.icon
              size={16}
              className={
                activeTab === tab.id
                  ? "text-black"
                  : "text-gray-500 group-hover:text-gray-900"
              }
            />
            <span>{tab.label}</span>
            <span className="text-xs text-gray-500 bg-gray-100 rounded-md px-2 font-semibold">{tab.count}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-full" />
            )}
          </button>
        ))}
      </div>
      {filterMenu}
    </div>
  );
}
