import { useSelector } from "react-redux";
import { getCart, getTotalCartQuantity } from "../redux/cart/cartSlice";
import { cartRowLabel } from "../../helper/const";
import CartTableLeftRow from "./CartTableLeftRow";
const label = cartRowLabel;
function CartTableLeft() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const cartItems = useSelector(getCart);
  return (
    <>
      <div className=" flex justify-between border-b-2 border-blue-400 p-2 text-xl  font-bold uppercase ">
        <h2>Giỏ hàng</h2>
        <h2>Số lượng:{totalCartQuantity}</h2>
      </div>
      <div>
        <div className="hidden grid-cols-5 justify-items-center border-b-2  border-blue-400 p-2  md:grid  ">
          {label.map((item) => (
            <h2
              key={item.id}
              className={`text-base font-bold uppercase ${
                item.id === 1 ? "col-span-2" : ""
              }`}
            >
              {item.label}
            </h2>
          ))}
        </div>

        <div className="flex max-h-[300px] flex-col overflow-y-auto p-2 lg:max-h-[500px] ">
          {cartItems.map((item, index) => (
            <CartTableLeftRow key={index} data={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default CartTableLeft;
