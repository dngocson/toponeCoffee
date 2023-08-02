import SettingTableOperation from "../features/settings/SettingTableOperation";
import CreateEditSettingForm from "../features/settings/CreateEditSettingForm";
import SettingTable from "../features/settings/SettingTable";

function Settings() {
  return (
    <div>
      <SettingTableOperation />
      <SettingTable />
      <CreateEditSettingForm />
    </div>
  );
}

export default Settings;
