import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateSetting } from "./useCreateSetting";
import { MenuItemProps } from "../../ui/type";
import { useEditSetting } from "./useEditSetting";

// Initial value for Form
const initialFormValues = {
  type: "",
  price: 0,
  name: "",
  description: "",
};

function CreateEditSettingForm({
  editItem = initialFormValues,
  onCloseModal,
}: {
  editItem?: MenuItemProps;
  onCloseModal?: () => void;
}) {
  const { id: editId, ...editValue } = editItem;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<MenuItemProps>({
      defaultValues: isEditSession ? editValue : initialFormValues,
    });
  // Create Item
  const { addItem, isCreating } = useCreateSetting();
  // Edit Item
  const { editSetting, isEditing } = useEditSetting();
  const isWorking = isCreating || isEditing;
  const { errors } = formState;
  const onsubmitHandler: SubmitHandler<MenuItemProps> = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (!data.image) return;
    if (isEditSession)
      editSetting(
        { newItem: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      addItem(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
  };
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onsubmitHandler)}
    >
      <div className="s_t_row">
        <label htmlFor="type">Loại</label>
        <select className="s_t_input" id="type" {...register("type")}>
          <option value="drink">Nước</option>
          <option value="noodle">Mỳ cay</option>
          <option value="food">Cơm</option>
        </select>
      </div>

      <div className="s_t_row">
        <label htmlFor="promotion">Tình trạng</label>
        <select className="s_t_input" id="promotion" {...register("promotion")}>
          <option value="">---</option>
          <option value="best seller">BEST SELLER</option>
          <option value="new">NEW</option>
        </select>
      </div>

      <div className="s_t_row">
        <label className="" htmlFor="name">
          Tên
        </label>
        <input
          disabled={isWorking}
          className="s_t_input"
          type="text"
          id="name"
          {...register("name", {
            required: "Hãy điền thông tin",
          })}
        />
        {errors?.name?.message ? (
          <p className="text-red-500">{errors?.name?.message.toString()}</p>
        ) : undefined}
      </div>

      <div className="s_t_row">
        <label htmlFor="price">Giá</label>
        <input
          className="s_t_input"
          type="number"
          id="price"
          {...register("price", {
            required: "Hãy điền thông tin",
          })}
        />
        {errors?.price?.message ? (
          <p className="text-red-500">{errors?.price?.message.toString()}</p>
        ) : undefined}
      </div>

      <div className="s_t_row">
        <label>Miêu tả</label>
        <textarea
          disabled={isWorking}
          className="s_t_input"
          id="description"
          {...register("description", {
            required: "Hãy điền thông tin",
          })}
        />
        {errors?.description?.message ? (
          <p className="text-red-500">
            {errors?.description?.message.toString()}
          </p>
        ) : undefined}
      </div>

      <div className="s_t_row">
        <label htmlFor="image">Hình ảnh</label>
        <input
          disabled={isWorking}
          className="s_t_input cursor-pointer   bg-white file:cursor-pointer file:rounded-md file:border-0 file:bg-blue-600 file:p-3 file:px-2 file:text-white file:hover:bg-opacity-80"
          type="file"
          id="image"
          accept="image/*"
          {...register("image", {
            // required: "Hãy điền thông tin",
          })}
        />
        {errors?.image?.message ? (
          <p className="text-red-500">{errors?.image?.message.toString()}</p>
        ) : undefined}
      </div>
      <button onClick={onCloseModal} type="button">
        Đóng
      </button>
      <button className="btn_g" disabled={isWorking}>
        submit
      </button>
    </form>
  );
}

export default CreateEditSettingForm;
