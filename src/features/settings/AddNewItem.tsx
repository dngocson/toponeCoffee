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
          <button className="btn_g">Thêm món mới</button>
        </Modal.Open>
        <Modal.Window name="setting">
          <CreateEditSettingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddNewItem;
