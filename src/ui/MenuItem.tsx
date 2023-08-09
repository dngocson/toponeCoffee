import { Link } from "react-router-dom";
import { MenuItemProps } from "./type";
import { removeVietnameseTones } from "../helper/helperFunctions";
import { useAppDispatch } from "../features/redux/useAppDispatch ";
import { addItem } from "../features/redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
function MenuItem({ data }: { data: MenuItemProps }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const newItem = {
    id: data.id,
    image: data.image,
    name: data.name,
    quantity: 1,
    unitPrice: data.price,
    totalPrice: data.price * 1,
  };
  const promotion =
    data.promotion === "best seller" || data.promotion === "new";
  function onClickHandler() {
    dispatch(addItem(newItem));
  }
  function movetoDetail() {
    window.scrollTo(0, 0);
    navigate(`/menu/${removeVietnameseTones(data.name)}`);
  }
  return (
    <div className="group relative flex flex-col gap-2 overflow-hidden rounded-xl ">
      {promotion && (
        <p className="absolute left-[-56px] top-[21px] z-10 min-w-[200px] rotate-[-37deg] whitespace-nowrap bg-[#f00] px-[3rem] py-[0.2rem] text-center text-sm font-semibold uppercase text-white shadow-cardShadow2">
          {data.promotion}
        </p>
      )}
      <div className="relative h-[270px] w-[270px] overflow-hidden rounded-xl transition-all duration-300">
        <button onClick={movetoDetail}>
          <img
            className="h-[270px] w-[270px] rounded-xl shadow-cardShadow transition-all duration-300 group-hover:scale-110"
            src={data.image}
          />
        </button>
        <div
          onClick={() => onClickHandler()}
          className="absolute w-full cursor-pointer bg-[#007aff] py-2 text-center text-white group-hover:bottom-0"
        >
          Thêm vào giỏ hàng
        </div>
      </div>
      <p className="text-base font-bold uppercase">{data.name}</p>
      <p className="text-base font-normal lowercase">{data.price}đ</p>
    </div>
  );
}

export default MenuItem;
