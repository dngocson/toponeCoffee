import { CartItem } from "../redux/reduxType";
import { useAppDispatch } from "../redux/useAppDispatch ";
import {
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../redux/cart/cartSlice";
function CartTableLeftRow({ data }: { data: CartItem }) {
  const dispatch = useAppDispatch();
  function removeItemFromCart(id: number) {
    dispatch(deleteItem(id));
  }
  function inreaseHandler(id: number) {
    dispatch(increaseItemQuantity(id));
  }
  function decreaseHandler(id: number) {
    dispatch(decreaseItemQuantity(id));
  }
  return (
    <div className="grid grid-cols-5 items-center justify-items-center border-b border-gray-400 py-2 ">
      <div className="col-span-2 flex w-full items-center gap-2 ">
        <img
          className="h-[80px] w-[80px]"
          src={data.image}
          alt="Hình ảnh sản phẩm"
        />
        <div>
          <h2 className="capitalize">{data.name}</h2>
          <button
            onClick={() => removeItemFromCart(data.id)}
            className="text-[#dc2634]"
          >
            Xóa
          </button>
        </div>
      </div>
      <h2>{data.unitPrice}</h2>
      <div className="flex items-baseline justify-center gap-2">
        <button onClick={() => decreaseHandler(data.id)}>-</button>
        <h2>{data.quantity}</h2>
        <button onClick={() => inreaseHandler(data.id)}>+</button>
      </div>
      <h2>{data.totalPrice}</h2>
    </div>
  );
}

export default CartTableLeftRow;
