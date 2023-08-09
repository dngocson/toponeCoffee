import { useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  getCart,
  getTotalCartPrice,
  getTotalCartQuantity,
} from "../redux/cart/cartSlice";
import { useCreateOrder } from "./useCreateOrder";
import { generateRandomString } from "../../helper/helperFunctions";
import useFormPersist from "react-hook-form-persist";
const ShippingForm = () => {
  const { register, handleSubmit, formState, watch, setValue } = useForm();
  const { errors } = formState;
  const { createOrder, isCreating } = useCreateOrder();
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const cartItems = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const onSubmitHandler: SubmitHandler<any> = (data) => {
    const orderdata = {
      ...data,
      status: "pending",
      name: generateRandomString(6),
      totalPrice: totalCartPrice,
      totalQuantity: totalCartQuantity,
    };
    const newOrder = { order: orderdata, cart: cartItems };
    createOrder(newOrder);
  };
  useFormPersist("form2", { watch, setValue });
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="p-2">
      <div className="flex flex-col gap-2">
        <label className="text-lg font-bold" htmlFor="phoneNumber">
          Số điện thoại:
        </label>
        <input
          {...register("phoneNumber", {
            required: "vui lòng điền số điện thoại của bạn",
          })}
          id="phoneNumber"
          type="text"
          className="s_t_input"
        />
        {errors?.phoneNumber?.message ? (
          <p className="text-red-500">
            {errors?.phoneNumber?.message.toString()}
          </p>
        ) : undefined}
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <label className="text-lg font-bold" htmlFor="address">
          Địa chỉ giao hàng:
        </label>
        <input
          id="address"
          type="text"
          className="s_t_input"
          {...register("address", {
            required: "vui lòng nhập địa chỉ của bạn",
          })}
        />
        {errors?.address?.message ? (
          <p className="text-red-500">{errors?.address?.message.toString()}</p>
        ) : undefined}
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <label className="text-lg font-bold">Ghi chú</label>
        <textarea className="s_t_input" id="note" {...register("note")} />
        {errors?.note?.message ? (
          <p className="text-red-500">{errors?.note?.message.toString()}</p>
        ) : undefined}
      </div>

      <button disabled={isCreating} className="btn_g my-8  w-full self-center">
        Gửi
      </button>
    </form>
  );
};

export default ShippingForm;
