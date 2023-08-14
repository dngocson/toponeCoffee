import { MenuItemProps } from "./type";
import { motion } from "framer-motion";
import { removeVietnameseTones } from "../helper/helperFunctions";
import { useAppDispatch } from "../features/redux/useAppDispatch ";
import { addItem } from "../features/redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
function MenuItem({ data }: { data: MenuItemProps }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showButton, setShowButton] = useState(false);
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
    toast.success("Đã thêm vào giỏ hàng");
  }
  function movetoDetail() {
    window.scrollTo(0, 0);
    navigate(`/menu/${removeVietnameseTones(data.name)}`);
  }
  function onMouseEnter() {
    setShowButton(true);
  }
  function onMouseLeave() {
    setShowButton(false);
  }
  return (
    <motion.div
      viewport={{ once: true }}
      initial={{ y: 100, x: 100, opacity: 0 }}
      animate={{ y: 0, x: 0 }}
      transition={{ delay: 0.2 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
    >
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="group relative flex  flex-col gap-2 overflow-hidden rounded-xl  "
      >
        {promotion && (
          <p className="absolute left-[-56px] top-[21px] z-10 min-w-[200px] rotate-[-37deg] whitespace-nowrap bg-[#f00] px-[3rem] py-[0.2rem] text-center text-sm font-semibold uppercase text-white shadow-cardShadow2">
            {data.promotion}
          </p>
        )}
        <div className="relative h-[270px] w-[270px] overflow-hidden rounded-xl ">
          <button onClick={movetoDetail}>
            <img
              className="h-[270px] w-[270px] rounded-xl shadow-cardShadow transition-all duration-300  group-hover:scale-110"
              src={data.image}
            />
          </button>
          {showButton && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3, type: "tween" }}
              animate={{ y: 0, x: 0, opacity: 1 }}
              onClick={() => onClickHandler()}
              className=" absolute bottom-0 w-full  cursor-pointer bg-[#007aff] py-2 text-center text-white  "
            >
              Thêm vào giỏ hàng
            </motion.div>
          )}
        </div>
        <p className="text-base font-bold uppercase">{data.name}</p>
        <p className="text-base font-normal lowercase">{data.price}đ</p>
      </div>
    </motion.div>
  );
}

export default MenuItem;
