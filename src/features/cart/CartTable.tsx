import { useSelector } from "react-redux";
import CartTableLeft from "./CartTableLeft";
import CartTableRight from "./CartTableRight";
import { getCart } from "../redux/cart/cartSlice";
import { BsArrowBarLeft } from "react-icons/bs";
export const CartTable = ({ closeModal }: { closeModal?: () => void }) => {
  const cartItems = useSelector(getCart);
  if (cartItems.length === 0) return <h2>Giỏ hàng trống</h2>;
  return (
    <div>
      <div className="grid h-[90%] w-[1200px] grid-cols-7">
        <div className="col-span-5 border-2 border-blue-400">
          <CartTableLeft />
        </div>
        <div className="col-span-2 border-2 border-l-0 border-blue-400 bg-[#f6f6f6]">
          <CartTableRight onClose={closeModal} />
        </div>
      </div>
      <button
        onClick={closeModal}
        className="my-2 flex items-center justify-center font-bold text-blue-600"
      >
        <span>
          <BsArrowBarLeft />
        </span>
        Tiếp tục mua hàng
      </button>
    </div>
  );
};
