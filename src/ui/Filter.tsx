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
    <div className="flex justify-between gap-[2px] rounded-xl bg-white p-1 text-xs md:gap-3 md:p-2 md:text-base">
      {options.map((option) => (
        <button
          className={`rounded-xl px-1 py-2 transition-all duration-300 md:p-2 ${
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
