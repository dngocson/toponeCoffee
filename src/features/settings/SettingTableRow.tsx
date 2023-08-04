import ConfirmModal from "../../ui/ConfirmModal";
import Modal from "../../ui/Modal";
import { MenuItemProps } from "../../ui/type";
import CreateEditSettingForm from "./CreateEditSettingForm";
import { useDeleteSetting } from "./useDeleteSetting";

function SettingTableRow({ data }: { data: MenuItemProps }) {
  let transtype;
  if (data.type === "drink") transtype = "nước";
  if (data.type === "noodle") transtype = "Mỳ";
  if (data.type === "food") transtype = "Cơm";
  const { mutate, isDeleting } = useDeleteSetting();
  return (
    <div className="grid grid-cols-settingTable items-center justify-items-start gap-4 border-b  uppercase">
      <div className="relative overflow-hidden">
        {(data.promotion === "best seller" || data.promotion === "new") && (
          <p className="absolute left-[-60px] top-[20px] min-w-[200px] rotate-[-37deg] whitespace-nowrap bg-[#f00] px-[3rem] py-[0.2rem] text-center text-xs font-semibold text-white shadow-cardShadow2">
            {data.promotion}
          </p>
        )}
        <img
          src={data.image}
          alt="hình ảnh của món"
          className="h-[160px] w-[160px]"
        />
      </div>
      <p>{data.name}</p>
      <p>{transtype}</p>
      <p>{data.price}</p>
      <p>{data.promotion || "---"}</p>
      <div>
        <Modal>
          <div className="flex items-center gap-2">
            <Modal.Open opens="edit">
              <div className="cursor-pointer rounded-xl bg-blue-600 p-2 text-white hover:bg-blue-700">
                Sửa
              </div>
            </Modal.Open>
            <Modal.Open opens="delete">
              <div className="cursor-pointer rounded-xl bg-[#ff0000] p-2 text-white hover:bg-red-700">
                Xóa
              </div>
            </Modal.Open>
          </div>
          <Modal.Window name="delete">
            <ConfirmModal
              disabled={isDeleting}
              onConfirm={() => mutate(data.id!)}
              type={"Xóa"}
            />
          </Modal.Window>
          <Modal.Window name="edit">
            <CreateEditSettingForm editItem={data} />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default SettingTableRow;
