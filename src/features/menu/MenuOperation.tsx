import { useSearchParams } from "react-router-dom";
import { menuTypeOptions } from "../../helper/const";
const options = menuTypeOptions;
const MenuOperation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter =
    searchParams.get("type") || (options && options[0].value);
  function handleClick(value: string) {
    if (searchParams.get("page")) searchParams.set("page", "1");
    searchParams.set("type", value);
    setSearchParams(searchParams);
  }
  return (
    <div className=" border-r-4 border-blue-400 ">
      <div className="sticky top-[150px] flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            className={`min-w-[150px]  transition-all duration-300 ${
              currentFilter === option.value
                ? "bg-[#4f46e5] text-white"
                : "hover:bg-[#4f46e5] hover:text-white"
            }`}
            onClick={() => handleClick(option.value)}
            disabled={option.value === currentFilter}
          >
            <p className="px-2 text-left uppercase">{option.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuOperation;
