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
import { useAppDispatch } from "../redux/useAppDispatch ";
import { clearCart } from "../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { fetchAddress } from "../redux/cart/gpiSlice";
import { RootState } from "../redux/store";
import { BiCurrentLocation } from "react-icons/bi";
const ShippingForm = ({ onClose }: { onClose?: () => void }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { createOrder, isCreating } = useCreateOrder();
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const cartItems = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const {
    status: apiStatus,
    position,
    address,
  } = useSelector((state: RootState) => state.gpi);
  const { register, handleSubmit, formState, watch, setValue } = useForm();
  const { errors } = formState;
  const isLoadingApi = apiStatus === "loading";
  const positionToString = `${position.latitude}-${position.longitude}`;

  useFormPersist("form2", { watch, setValue, exclude: ["address"] });

  function layvitri() {
    if (address) setValue("address", address);
    dispatch(fetchAddress());
  }

  const onSubmitHandler: SubmitHandler<any> = (data) => {
    const orderdata = {
      ...data,
      status: "pending",
      name: generateRandomString(6),
      totalPrice: totalCartPrice,
      totalQuantity: totalCartQuantity,
      location: positionToString,
    };
    const newOrder = { order: orderdata, cart: cartItems };
    createOrder(newOrder, {
      onSuccess: (data) => {
        dispatch(clearCart());
        onClose?.();
        navigate(`/order/${data.data[0].name}`);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="p-2">
      <div className="flex flex-col gap-2">
        <label
          className=" text-sm font-bold  md:text-base "
          htmlFor="phoneNumber"
        >
          Số điện thoại:
        </label>
        <input
          {...register("phoneNumber", {
            required: "vui lòng điền số điện thoại của bạn",
          })}
          id="phoneNumber"
          type="number"
          className="s_t_input"
          disabled={isCreating || isLoadingApi}
        />
        {errors?.phoneNumber?.message ? (
          <p className="text-red-500">
            {errors?.phoneNumber?.message.toString()}
          </p>
        ) : undefined}
      </div>

      <div className=" mt-2 flex flex-col gap-2">
        <div className="flex items-center  gap-1">
          <label
            className=" text-sm font-bold md:text-base  "
            htmlFor="address"
          >
            Địa chỉ giao hàng:
          </label>
          <button className="text-blue-500" type="button" onClick={layvitri}>
            <BiCurrentLocation size={20} />
          </button>
        </div>
        <textarea
          defaultValue={address}
          disabled={isCreating || isLoadingApi}
          id="address"
          className="s_t_input"
          {...register("address")}
        />

        {errors?.address?.message ? (
          <p className="text-red-500">{errors?.address?.message.toString()}</p>
        ) : undefined}
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <label className=" text-sm font-bold  md:text-base ">Ghi chú</label>
        <textarea
          disabled={isCreating || isLoadingApi}
          className="s_t_input"
          id="note"
          {...register("note")}
        />
        {errors?.note?.message ? (
          <p className="text-red-500">{errors?.note?.message.toString()}</p>
        ) : undefined}
      </div>
      <button
        disabled={isCreating || isLoadingApi}
        className="btn_g my-8  w-full self-center"
      >
        Gửi
      </button>
    </form>
  );
};

export default ShippingForm;
