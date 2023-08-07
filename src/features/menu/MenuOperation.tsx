import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { menuOptionsWithSubTypes } from "../../helper/const";
import { MenuOptionProps } from "./type";
import { useGetType } from "../../helper/useGetType";

const options = menuOptionsWithSubTypes;

const MenuOperation = () => {
  return (
    <div className="border-r-4 border-blue-400">
      <div className="sticky top-[150px] flex flex-col gap-4">
        {options.map((item) => (
          <MenuOperationItem key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
};

function MenuOperationItem({ item }: { item: MenuOptionProps }) {
  const [open, setOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentType, subType] = useGetType("type") || ["all", ""];
  useEffect(() => {
    if (subType) setOpen(false);
  }, []);
  function handleClick(value: string) {
    searchParams.set("type", value);
    setSearchParams(searchParams);
  }

  if (item.childrens) {
    return (
      <div className={"w-[200px] rounded-md transition-colors duration-300"}>
        <p
          className={`hover:bg-[#4f46e5] hover:text-white ${
            item.value === currentType ? "bg-[#4f46e5] text-white" : ""
          } ${item.type === "sub" ? "" : "cursor-pointer p-2 font-semibold"}`}
          onClick={() => setOpen((open) => !open)}
        >
          {item.label}
        </p>

        <div className={open ? "h-0 overflow-hidden" : "h-auto"}>
          {item.childrens.map((child, index) => (
            <MenuOperationItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <p
        className={`cursor-pointer transition-all duration-300 hover:bg-[#4f46e5] hover:text-white ${
          item.value === currentType ? "bg-[#4f46e5] text-white" : ""
        } ${
          item.type === "sub"
            ? "p-2 pl-4 text-sm text-red-400"
            : "p-2 font-semibold "
        }`}
        onClick={() => handleClick(item.value)}
      >
        {item.label}
      </p>
    );
  }
}

export default MenuOperation;
