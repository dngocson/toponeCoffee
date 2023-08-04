import SettingTableOperation from "../features/settings/SettingTableOperation";
import SettingTable from "../features/settings/SettingTable";
import AddNewItem from "../features/settings/AddNewItem";

function Settings() {
  return (
    <div className="mx-auto w-[1200px]">
      <SettingTableOperation />
      <SettingTable />
      <AddNewItem />
    </div>
  );
}

export default Settings;
