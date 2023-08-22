import { useSearchParams } from "react-router-dom";
import { useMenu } from "./useMenu";
import Spinner from "../../ui/Spinner";
import { MenuItemListProps } from "./type";
import MenuItem from "../../ui/MenuItem";
import { allMenuList, menuShortOption1 } from "../../helper/const";
import { useGetType } from "../../helper/useGetType";
const selectForSmallScreen = allMenuList;
const MenuItemList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, subType] = useGetType("type");

  const { isLoading, menuItems } = useMenu();
  if (isLoading) return <Spinner />;
  if (!menuItems) return <p>Đang tải dữ liệu</p>;
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const isAscending = direction === "asc";
  const sortedMenu = menuItems.data
    ? [...menuItems.data].sort((a, b) => {
        const compare =
          field === "name"
            ? a[field].localeCompare(b[field])
            : a[field] - b[field];
        return isAscending ? compare : -compare;
      })
    : [];
  const sortOptions = menuShortOption1;
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  function onChangeSelectSmallScreen(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("type", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <div className="flex w-full flex-col gap-4 lg:ml-16">
      <div className="sticky top-[75px] z-[20] flex flex-col justify-between gap-1 rounded-xl  p-1 text-sm backdrop-blur-sm lg:top-[150px] lg:flex-row lg:text-base lg:backdrop-blur-0">
        <h1 className="hidden lg:block"></h1>
        <select
          onChange={onChangeSelectSmallScreen}
          defaultValue={searchParams.get("type") || "all"}
          className="block cursor-pointer rounded-xl bg-white p-2 text-sm outline outline-1 outline-blue-700 lg:hidden lg:text-base"
        >
          {selectForSmallScreen.map((item) => (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <div>
          <select
            className="w-full cursor-pointer rounded-xl bg-white p-2 text-sm  outline outline-1 outline-blue-700 lg:text-base"
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
      <div className="ml-2 flex flex-col gap-4 text-2xl ">
        {["all", "drink"].includes(type!) && (
          <SectionPart
            type={type}
            subType={subType}
            message="Cà phê, trà sữa Top One"
            data={sortedMenu.filter((item) => item.type === "drink")}
          />
        )}
        {["all", "noodle"].includes(type!) && (
          <SectionPart
            type={type}
            subType={subType}
            message="Mỳ cay Top One"
            data={sortedMenu.filter((item) => item.type === "noodle")}
          />
        )}
        {["all", "food"].includes(type!) && (
          <SectionPart
            type={type}
            subType={subType}
            message="Cơm Top One"
            data={sortedMenu.filter((item) => item.type === "food")}
          />
        )}
      </div>
    </div>
  );
};

const SectionPart = ({
  type,
  data,
  subType,
  message: title,
}: MenuItemListProps) => {
  interface Messages {
    [key: string]: string | { [key: string]: string };
  }

  const messages: Messages = {
    drink: {
      tea: "Trà trái cây ",
      yogurt: "Sữa chua ",
      juice: "Nước ép, đá xay ",
      "milk-tea": "Trà sữa Top One",
      other: "Các thức uống khác ",
      default: "Cà phê, trà sữa ",
    },
    noodle: "Mỳ cay 7 cấp",
    food: "Cơm văn phòng",
  };
  const message =
    type !== null && subType !== null && type === "drink"
      ? (messages[type] as { [key: string]: string })[subType as string] ||
        (messages[type] as { [key: string]: string }).default
      : messages[type!];

  const filteredData =
    subType === "all"
      ? data
      : subType
      ? data.filter((item) => item.sub_type === type + "_" + subType)
      : data;

  return (
    <div>
      <div className="flex  flex-col gap-4">
        {type !== "all" && (
          <h1 className="text-2xl font-bold">{message.toString()}</h1>
        )}
        {type === "all" && <h1 className="text-2xl font-bold">{title}</h1>}
        <div className="grid grid-cols-2 justify-items-center gap-2 text-base md:grid-cols-3 md:gap-5">
          {filteredData.map((item) => (
            <MenuItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuItemList;
