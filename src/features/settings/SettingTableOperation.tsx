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
    <div className="flex justify-between">
      <h1>Menu</h1>
      <div>
        {options.map((option) => (
          <button
            className={currentFilter === option.value ? "text-red-400" : ""}
            key={option.value}
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
