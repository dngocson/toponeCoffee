import { useSearchParams } from "react-router-dom";

interface FilterProps {
  filterField: string;
  options: { value: string; label: string }[];
}

function Filter({
  filterField,
  options = [{ value: "", label: "" }],
}: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter =
    searchParams.get(filterField) || (options && options[0].value);
  function handleClick(value: string) {
    if (searchParams.get("page")) searchParams.set("page", "1");
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }
  return (
    <div className="flex gap-3 rounded-xl bg-white p-2">
      {options.map((option) => (
        <button
          className={`rounded-xl p-2 transition-all duration-300 ${
            currentFilter === option.value
              ? "bg-[#4f46e5] text-white"
              : "hover:bg-[#4f46e5] hover:text-white"
          }`}
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
export default Filter;
