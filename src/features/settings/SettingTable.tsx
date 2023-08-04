import { useSearchParams } from "react-router-dom";
import { useMenu } from "../menu/useMenu";
import Spinner from "../../ui/Spinner";
import SettingTableRow from "./SettingTableRow";
import { MenuItemProps } from "../../ui/type";

function SettingTable() {
  const { isLoading, menuItem } = useMenu();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!menuItem?.data.length) return <p>Không tìm thấy dữ liệu trên server</p>;
  const filterValue = searchParams.get("type") || "all";

  let filteredMenu: MenuItemProps[] = [];
  if (filterValue === "all") filteredMenu = menuItem.data;

  if (filterValue === "noodle")
    filteredMenu = menuItem.data.filter((type) => type.type === "noodle");

  if (filterValue === "drink")
    filteredMenu = menuItem.data.filter((type) => type.type === "drink");

  if (filterValue === "food")
    filteredMenu = menuItem.data.filter((type) => type.type === "food");

  return (
    <div className="mx-auto mt-8  rounded-xl border-2">
      <div className="grid grid-cols-settingTable items-center justify-items-start gap-4 border-b text-lg font-bold uppercase">
        <p></p>
        <p>Tên</p>
        <p>Loại</p>
        <p>Giá</p>
        <p>Trạng thái</p>
        <p></p>
      </div>
      <div className="mx-auto  w-[1200px]">
        {filteredMenu.map((item) => (
          <SettingTableRow key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

export default SettingTable;
