import { useSearchParams } from "react-router-dom";
import { menuShortOption, menuTypeOptions } from "../../helper/const";

// Propety for Sort and Filter
const filterOptions = menuTypeOptions;
const sortOptions = menuShortOption;
function SettingTableOperation() {
  const [searchParams, setSearchParams] = useSearchParams();

  // For filter
  const currentFilter =
    searchParams.get("type") || (filterOptions && filterOptions[0].value);
  function handleClick(value: string) {
    if (searchParams.get("page")) searchParams.set("page", "1");
    searchParams.set("type", value);
    setSearchParams(searchParams);
  }
  // For sort
  // const sortBy = searchParams.get("sortBy") || "";
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <div className="mx-auto mt-8 flex  items-center justify-between rounded-xl border border-blue-600">
      <h1 className="ml-5 text-2xl">Menu</h1>
      <div className="flex items-center gap-4">
        <div className="flex gap-2 rounded-xl bg-white p-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              className={`rounded-xl p-2 transition-all duration-300 ${
                currentFilter === option.value
                  ? "bg-[#4f46e5] text-white"
                  : "hover:bg-[#4f46e5] hover:text-white"
              }`}
              onClick={() => handleClick(option.value)}
              disabled={option.value === currentFilter}
            >
              <p className={"uppercase"}>{option.label}</p>
            </button>
          ))}
        </div>
        <div>
          <select
            className="cursor-pointer rounded-xl p-4 focus:border-none focus:outline-none focus:ring-0"
            onChange={handleChange}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SettingTableOperation;
