import { useSearchParams } from "react-router-dom";
import { useMenu } from "../menu/useMenu";
import Spinner from "../../ui/Spinner";
import SettingTableRow from "./SettingTableRow";
import { MenuItemProps } from "../../ui/type";

function SettingTable() {
  const { isLoading, menuItems } = useMenu();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!menuItems?.data.length) return <p>Không tìm thấy dữ liệu trên server</p>;
  const filterValue = searchParams.get("type") || "all";
  // filter
  let filteredMenu: MenuItemProps[] = [];
  if (filterValue === "all") filteredMenu = menuItems.data;

  if (filterValue === "noodle")
    filteredMenu = menuItems.data.filter((type) => type.type === "noodle");

  if (filterValue === "drink")
    filteredMenu = menuItems.data.filter((type) => type.type === "drink");

  if (filterValue === "food")
    filteredMenu = menuItems.data.filter((type) => type.type === "food");
  // sort
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const isAscending = direction === "asc";
  const sortedMenu = filteredMenu
    ? [...filteredMenu].sort((a, b) => {
        const compare =
          field === "name"
            ? a[field].localeCompare(b[field])
            : a[field] - b[field];
        return isAscending ? compare : -compare;
      })
    : [];
  return (
    <div className="mx-auto mt-8 overflow-hidden rounded-xl border border-blue-600">
      <div className=" grid grid-cols-settingTable items-center justify-items-start  gap-4 border-b border-b-blue-600 text-lg font-bold uppercase">
        <p></p>
        <p>Tên</p>
        <p>Loại</p>
        <p>Giá</p>
        <p>Tình trạng</p>
        <p>Chỉnh sửa</p>
      </div>
      <div className="mx-auto  w-[1200px]">
        {sortedMenu.map((item) => (
          <SettingTableRow key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

export default SettingTable;
