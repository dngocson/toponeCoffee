import { useSearchParams } from "react-router-dom";
import { useMenu } from "./useMenu";
import Spinner from "../../ui/Spinner";
import { MenuItemListProps } from "./type";
import MenuItem from "../../ui/MenuItem";
import { menuShortOption1 } from "../../helper/const";
import { useGetType } from "../../helper/useGetType";

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
  return (
    <div className=" ml-16 flex flex-col gap-4">
      <div className="flex flex-col gap-4 text-2xl ">
        <div className="sticky top-[150px] z-50 flex items-center justify-between">
          Menu
          <div>
            <select
              className="cursor-pointer rounded-xl p-2 text-base focus:border-none focus:outline-none focus:ring-0"
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
        {["all", "drink"].includes(type!) && (
          <SectionPart
            type={type}
            subType={subType}
            message="Cà phê, trà sữa của Top One"
            data={sortedMenu.filter((item) => item.type === "drink")}
          />
        )}
        {["all", "noodle"].includes(type!) && (
          <SectionPart
            type={type}
            subType={subType}
            message="Mỳ cay của Top One"
            data={sortedMenu.filter((item) => item.type === "noodle")}
          />
        )}
        {["all", "food"].includes(type!) && (
          <SectionPart
            type={type}
            subType={subType}
            message="Cơm của Top One"
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
      tea: "Trà trái cây của Top One",
      yogurt: "Sữa chua của Top One",
      juice: "Nước ép, đá xay của Top One",
      "milk-tea": "Trà sữa của Top One",
      other: "Các thức uống khác của Top One",
      default: "Cà phê, trà sữa của Top One",
    },
    noodle: "Mỳ cay của Top One",
    food: "Cơm của Top One",
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
      <div className="flex flex-col gap-4">
        {type !== "all" && (
          <h1 className="text-2xl font-bold">{message.toString()}</h1>
        )}
        {type === "all" && <h1 className="text-2xl font-bold">{title}</h1>}
        <div className="grid grid-cols-3 gap-5">
          {filteredData.map((item) => (
            <MenuItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuItemList;
