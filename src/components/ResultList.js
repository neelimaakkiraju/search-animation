import ResultItem from "./ResultItem";

export default function ResultList(props) {
  const { data, query, settingsOpen } = props;
  if (!data.length)
    return <p className="p-4 text-gray-400 text-sm">No results found</p>;

  return (
    <div className="divide-y">
      {data.map((item, i) => (
        <ResultItem
          key={i}
          item={item}
          query={query}
          settingsOpen={
            typeof settingsOpen === "boolean" ? settingsOpen : false
          }
        />
      ))}
    </div>
  );
}
