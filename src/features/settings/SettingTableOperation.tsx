import { useSearchParams } from "react-router-dom";
import { menuTypeOptions } from "../../helper/const";

const options = menuTypeOptions;
function SettingTableOperation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter =
    searchParams.get("type") || (options && options[0].value);

  function handleClick(value: string) {
    if (searchParams.get("page")) searchParams.set("page", "1");
    searchParams.set("type", value);
    setSearchParams(searchParams);
  }
  return (
    <div className="mx-auto mt-8 flex  items-center justify-between rounded-xl border-2">
      <h1 className="ml-5 text-2xl">Menu</h1>
      <div className="flex gap-2 rounded-xl bg-white p-2">
        {options.map((option) => (
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
    </div>
  );
}

export default SettingTableOperation;
