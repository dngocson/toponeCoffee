import { CartItem, DispatchProps } from "../redux/reduxType";
import { useAppDispatch } from "../redux/useAppDispatch ";
import {
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../redux/cart/cartSlice";

function CartTableLeftRow({ data }: { data: CartItem }) {
  const dispatch = useAppDispatch();
  function removeItemFromCart({ id, iceLevel, suggarLevel }: DispatchProps) {
    dispatch(deleteItem({ id, iceLevel, suggarLevel }));
  }
  function inreaseHandler({ id, iceLevel, suggarLevel }: DispatchProps) {
    dispatch(increaseItemQuantity({ id, iceLevel, suggarLevel }));
  }
  function decreaseHandler({ id, iceLevel, suggarLevel }: DispatchProps) {
    dispatch(decreaseItemQuantity({ id, iceLevel, suggarLevel }));
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
          <div>
            <h2 className="font-bold capitalize">{data.name}</h2>
            {data.iceLevel !== null && data.suggarLevel !== null ? (
              <div className="flex gap-1">
                <p className=" ">
                  <span>Đá:</span>
                  <span className="">{data.iceLevel}%,</span>
                </p>
                <p className="">
                  <span>Đường:</span>
                  <span>{data.suggarLevel}%</span>
                </p>
              </div>
            ) : null}

            <button
              onClick={() =>
                removeItemFromCart({
                  id: data.id,
                  iceLevel: data.iceLevel,
                  suggarLevel: data.suggarLevel,
                })
              }
              className="text-[#dc2634]"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
      <h2>{data.unitPrice}</h2>
      <div className="flex items-baseline justify-center gap-2">
        <button
          onClick={() =>
            decreaseHandler({
              id: data.id,
              iceLevel: data.iceLevel,
              suggarLevel: data.suggarLevel,
            })
          }
        >
          -
        </button>
        <h2>{data.quantity}</h2>
        <button
          onClick={() =>
            inreaseHandler({
              id: data.id,
              iceLevel: data.iceLevel,
              suggarLevel: data.suggarLevel,
            })
          }
        >
          +
        </button>
      </div>
      <h2>{data.totalPrice}</h2>
    </div>
  );
}

export default CartTableLeftRow;
