import { useSelector } from "react-redux";
import { getTotalCartPrice } from "../redux/cart/cartSlice";
import ShippingForm from "./ShippingForm";
import { formatCurrencyNumber } from "../../helper/helperFunctions";
function CartTableRight({ onClose }: { onClose?: () => void }) {
  const totalCartPrice = useSelector(getTotalCartPrice);
  return (
    <div>
      <h2 className="border-b-2  border-blue-400 p-2 text-center text-xl font-bold uppercase">
        Thông tin đơn hàng
      </h2>
      <div className=" border-b-2 border-blue-400 p-2 text-xl font-bold uppercase">
        <h2>
          Tổng đơn: {formatCurrencyNumber(totalCartPrice.toString())}
          <span className="lowercase">vnđ</span>
        </h2>
      </div>
      <ShippingForm onClose={onClose} />
    </div>
  );
}

export default CartTableRight;
