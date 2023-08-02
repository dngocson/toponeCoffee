import { useSearchParams } from "react-router-dom";
import { useMenu } from "../menu/useMenu";
import Spinner from "../../ui/Spinner";
import SettingTableRow from "./SettingTableRow";

function SettingTable() {
  const { isLoading, menuItem } = useMenu();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!menuItem?.data.length) return <p>Không tìm thấy dữ liệu trên server</p>;
  const filterValue = searchParams.get("type") || "all";

  let filteredMenu = [];
  if (filterValue === "all") filteredMenu = menuItem.data;

  if (filterValue === "noodle")
    filteredMenu = menuItem.data.filter((type) => type.type === "noodle");

  if (filterValue === "drink")
    filteredMenu = menuItem.data.filter((type) => type.type === "drink");

  if (filterValue === "food")
    filteredMenu = menuItem.data.filter((type) => type.type === "food");
  console.log(filteredMenu);

  return (
    <div>
      {filteredMenu.map((item) => (
        <SettingTableRow />
      ))}
    </div>
  );
}

export default SettingTable;
