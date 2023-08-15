import { orderStatusOptions } from "../../helper/const";
import { useState } from "react";
import { useUpdateOrderById } from "./useUpdateOrderById";
const options = orderStatusOptions;
const UpdateOrderStatus = ({
  currentValue,
  id,
  closeModal,
}: {
  currentValue: string;
  id: number;
  closeModal?: () => void;
}) => {
  const [selected, setSelected] = useState(currentValue);
  const { mutate, isLoading } = useUpdateOrderById();

  function handleChange(e: any) {
    setSelected(e.target.value);
  }
  function onClickHandler() {
    mutate({ id, value: selected }, { onSuccess: closeModal });
  }
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="type" className="font-bold">
        Trạng thái đơn hàng
      </label>
      <select
        className="s_t_input"
        id="type"
        value={selected}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button disabled={isLoading} onClick={onClickHandler} className="btn_g">
        Cập nhật
      </button>
    </div>
  );
};

export default UpdateOrderStatus;
