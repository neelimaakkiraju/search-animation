export default function Tabs({ activeTab, setActiveTab, counts }) {
  const tabs = [
    { id: "all", label: "All", count: counts.all },
    { id: "files", label: "Files", count: counts.files },
    { id: "people", label: "People", count: counts.people }
  ];

  return (
    <div className="flex px-4 space-x-6 border-b text-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative py-3 ${
            activeTab === tab.id ? "font-semibold text-black" : "text-gray-500"
          }`}
        >
          {tab.label}{" "}
          <span className="ml-1 text-xs text-gray-400">{tab.count}</span>
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
