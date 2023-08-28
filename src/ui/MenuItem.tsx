import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import { useAppDispatch } from "../features/redux/useAppDispatch ";
import { addItem } from "../features/redux/cart/cartSlice";

import Modal from "./Modal";
import { MenuItemProps } from "./type";

import {
  formatCurrencyNumber,
  removeVietnameseTones,
} from "../helper/helperFunctions";
import { iceLevel, suggarLevel } from "../helper/const";

import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

function MenuItem({ data }: { data: MenuItemProps }) {
  const navigate = useNavigate();
  const promotion =
    data.promotion === "best seller" || data.promotion === "new";
  function onClickHandler() {}
  function movetoDetail() {
    // window.scrollTo(0, 0);
    navigate(`/menu/${removeVietnameseTones(data.name)}`);
  }

  return (
    <motion.div
      viewport={{ once: true }}
      initial={{ y: 100, x: 100, opacity: 0 }}
      animate={{ y: 0, x: 0 }}
      transition={{ delay: 0.2 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
    >
      <div className="group relative flex  flex-col gap-2 overflow-hidden rounded-xl  ">
        {promotion && (
          <p className="absolute left-[-69px] top-[14px] z-10 min-w-[200px] rotate-[-37deg] whitespace-nowrap bg-[#f00] px-[3rem] py-[0.2rem] text-center text-[10px] font-semibold uppercase text-white shadow-cardShadow2 md:left-[-56px] md:top-[21px] md:text-base">
            {data.promotion}
          </p>
        )}
        <div className="relative h-[140px] w-[140px] overflow-hidden rounded-xl shadow-md sm:h-[210px] sm:w-[210px] xl:h-[270px] xl:w-[270px] ">
          <button onClick={movetoDetail}>
            <img
              className=" h-[140px] w-[140px] rounded-xl   transition-all duration-300 group-hover:scale-110 sm:h-[210px] sm:w-[210px] xl:h-[270px]  xl:w-[270px]"
              src={data.image}
            />
          </button>
          {
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3, type: "tween" }}
              animate={{ y: 0, x: 0, opacity: 1 }}
              onClick={() => onClickHandler()}
              className=" absolute bottom-0 hidden w-full cursor-pointer bg-amber-500 text-center text-white group-hover:block  "
            >
              <Modal>
                <Modal.Open opens="addItemToCart">
                  <button className="w-full  p-1 py-2 text-xs md:text-base ">
                    Thêm vào giỏ hàng
                  </button>
                </Modal.Open>
                <Modal.Window name="addItemToCart">
                  <AddItemToCartModal item={data} />
                </Modal.Window>
              </Modal>
            </motion.div>
          }
        </div>
        <p className=" w-[140px] text-xs font-bold uppercase md:w-full md:text-base">
          {data.name}
        </p>
        <p className="pb-1 text-xs font-normal lowercase md:text-base">
          {data.price}đ
        </p>
      </div>
    </motion.div>
  );
}

export default MenuItem;

function AddItemToCartModal({
  item,
  closeModal,
}: {
  item: MenuItemProps;
  closeModal?: () => void;
}) {
  const dispatch = useAppDispatch();
  const [sugar_level, setSugar_level] = useState(100);
  const [ice_level, setIce_level] = useState(100);
  const [quantity, setQuantity] = useState(1);
  function decreaseQuantityHandler() {
    if (quantity === 1) return;
    setQuantity((quantity) => quantity - 1);
  }
  function increaseQuantityHandler() {
    setQuantity((quantity) => quantity + 1);
  }
  function addToCartHandler() {
    const newItem = {
      id: item.id,
      image: item.image,
      name: item.name,
      quantity: quantity,
      unitPrice: item.price,
      totalPrice: item.price * quantity,
      iceLevel: item.hasSI_level === "true" ? ice_level : null,
      suggarLevel: item.hasSI_level === "true" ? sugar_level : null,
    };
    dispatch(addItem(newItem));
    toast.success("Đã thêm vào giỏ hàng");
    setQuantity(1);
    closeModal?.();
  }

  return (
    <div className=" grid min-w-[280px] grid-cols-1  gap-2 text-xs  md:text-base lg:min-w-[800px] lg:grid-cols-2 lg:gap-6">
      <div className="relative hidden aspect-square h-full w-full overflow-hidden rounded-lg sm:block">
        {item.promotion && (
          <p className="absolute left-[-56px] top-[21px] z-10 min-w-[200px] rotate-[-37deg] whitespace-nowrap bg-[#f00] px-[3rem] py-[0.2rem] text-center  text-sm font-semibold uppercase text-white shadow-cardShadow2 md:left-[-44px] md:top-[28px] md:px-[5,5rem] md:py-[0.32rem] md:text-lg lg:left-[-77px] lg:top-[41px] lg:px-[6rem] lg:py-[0.4rem] lg:text-xl">
            <p className="text-center md:w-[112px] lg:w-[121px]">
              {item.promotion}
            </p>
          </p>
        )}
        <img
          src={item.image}
          alt="hình ảnh sản phẩm"
          className="h-full w-full rounded-lg transition-all duration-300 hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 lg:gap-4">
        <h2 className="text-xl font-bold">{item.name}</h2>
        <h2 className="text-xl text-[#e57905]">
          {formatCurrencyNumber((item.price * quantity).toString())}đ
        </h2>

        <div className="flex items-center gap-2">
          <h2>Số lượng:</h2>
          <button
            className="rounded-full text-2xl text-[#e57905] disabled:cursor-not-allowed"
            onClick={decreaseQuantityHandler}
            disabled={quantity === 1}
          >
            <AiFillMinusCircle />
          </button>
          <p className="text-lg font-bold">{quantity}</p>
          <button
            className="rounded-full text-2xl text-[#e57905] "
            onClick={increaseQuantityHandler}
          >
            <AiFillPlusCircle />
          </button>
        </div>
        {item.hasSI_level === "true" && (
          <div className="flex flex-col gap-2">
            <h3>Chọn mức đường của bạn:</h3>
            <div className="flex flex-wrap gap-2">
              {suggarLevel.map((level, index) => (
                <button
                  key={index}
                  className={`whitespace-nowrap rounded-md border border-[#e57905] p-1 text-xs transition-colors duration-300 hover:bg-[#e57905] hover:text-white md:text-sm  ${
                    level.value === sugar_level
                      ? "bg-[#e57905] text-white"
                      : "border-[#e57905] "
                  }`}
                  onClick={() => setSugar_level(level.value)}
                >
                  {level.label}
                </button>
              ))}
            </div>
            <h3>Chọn mức đá của bạn:</h3>
            <div className="flex flex-wrap gap-2">
              {iceLevel.map((level, index) => (
                <button
                  key={index}
                  className={`rounded-md border border-[#e57905] p-1 text-xs transition-colors duration-300 hover:bg-[#e57905] hover:text-white md:text-sm  ${
                    level.value === ice_level
                      ? "bg-[#e57905] text-white"
                      : "border-[#e57905] "
                  }`}
                  onClick={() => setIce_level(level.value)}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        )}
        {item.hasSI_level === "false" && (
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Mô tả sản phẩm:</h2>
            <p className="max-h-[160px] overflow-auto ">{item.description}</p>
          </div>
        )}
        <button
          onClick={addToCartHandler}
          className="mt-3 w-full rounded-md bg-[#e57905] p-2 text-white transition-all duration-300 hover:bg-opacity-[85%]"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
