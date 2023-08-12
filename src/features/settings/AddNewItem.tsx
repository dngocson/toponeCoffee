import CreateEditSettingForm from "./CreateEditSettingForm";
import Modal from "../../ui/Modal";

const AddNewItem = () => {
  return (
    <div>
      {/* <button onClick={() => setIsOpenModal((show) => !show)} className="btn_g">
        Thêm món mới
      </button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateEditSettingForm onClose={() => setIsOpenModal(false)} />
        </Modal>
      )} */}
      <Modal>
        <Modal.Open opens="setting">
          <div className="rounded-xl bg-white p-2">
            <button className="rounded-md bg-[#4f46e5] p-2 text-white">
              Thêm món mới
            </button>
          </div>
        </Modal.Open>
        <Modal.Window name="setting">
          <CreateEditSettingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddNewItem;
