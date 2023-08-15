import { ConfirmModalProps } from "./type";

function ConfirmModal({
  onConfirm,
  type,
  closeModal,
  disabled,
}: ConfirmModalProps) {
  return (
    <div className="flex flex-col gap-4">
      <p>Bạn có chắc muốn thực hiện hành động này?</p>
      <div className="flex justify-end gap-3">
        <button className="btn_cf" onClick={closeModal}>
          Hủy
        </button>
        <button
          disabled={disabled}
          className="btn_cf bg-[#ff0000] text-white disabled:bg-red-300"
          onClick={onConfirm}
        >
          {type}
        </button>
      </div>
    </div>
  );
}

export default ConfirmModal;
