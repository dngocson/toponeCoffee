import { useSelector } from "react-redux";
import CartTableLeft from "./CartTableLeft";
import CartTableRight from "./CartTableRight";
import { getCart } from "../redux/cart/cartSlice";
import { BsArrowBarLeft } from "react-icons/bs";
export const CartTable = ({ closeModal }: { closeModal?: () => void }) => {
  const cartItems = useSelector(getCart);
  if (cartItems.length === 0)
    return <h2 className="px-2 py-5 sm:p-0">Giỏ hàng trống</h2>;
  return (
    <div className="h-[500px] overflow-y-auto smallPhone:w-[315px] mediumPhone:w-[370px] largePhone:h-[640px] largePhone:w-[400px] sm:max-h-fit md:w-max lg:w-min">
      <div className=" flex flex-col lg:grid lg:min-w-[900px] lg:grid-cols-7 xl:min-w-[1200px]">
        <div className="col-span-5 border-2 border-blue-400">
          <CartTableLeft />
        </div>
        <div className="col-span-2 border-2 border-t-0 border-blue-400 bg-[#f6f6f6] lg:border-l-0 lg:border-t-2">
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
