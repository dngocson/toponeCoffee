import { MenuItemProps } from "../../ui/type";
import { useDeleteSetting } from "./useDeleteSetting";

function SettingTableRow({ data }: { data: MenuItemProps }) {
  let transtype;
  if (data.type === "drink") transtype = "nước";
  if (data.type === "noodle") transtype = "Mỳ";
  if (data.type === "food") transtype = "Cơm";
  const { mutate, isDeleting } = useDeleteSetting();
  return (
    <div className="grid grid-cols-settingTable items-center justify-items-start gap-4 border-b uppercase">
      <img
        src={data.image}
        alt="hình ảnh của món"
        className="h-[160px] w-[160px]"
      />
      <p>{data.name}</p>
      <p>{transtype}</p>
      <p>{data.price}</p>
      <p>{data.promotion || "---"}</p>
      <button disabled={isDeleting} onClick={() => mutate(data.id!)}>
        Xóa
      </button>
    </div>
  );
}

export default SettingTableRow;
