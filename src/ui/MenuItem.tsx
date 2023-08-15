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
    window.scrollTo(0, 0);
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
                  <button className="w-full py-2 ">Thêm vào giỏ hàng</button>
                </Modal.Open>
                <Modal.Window name="addItemToCart">
                  <AddItemToCartModal item={data} />
                </Modal.Window>
              </Modal>
            </motion.div>
          }
        </div>
        <p className="text-base font-bold uppercase">{data.name}</p>
        <p className="text-base font-normal lowercase">{data.price}đ</p>
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
    <div className="flex flex-col">
      <div className=" grid grid-cols-2 gap-4">
        <div className="relative h-[400px] w-[400px] overflow-hidden rounded-lg">
          {item.promotion && (
            <p className="absolute left-[-56px] top-[21px] z-10 min-w-[200px] rotate-[-37deg] whitespace-nowrap bg-[#f00] px-[3rem] py-[0.2rem] text-center text-sm font-semibold uppercase text-white shadow-cardShadow2">
              {item.promotion}
            </p>
          )}
          <img
            src={item.image}
            alt="hình ảnh sản phẩm"
            className="h-full w-full rounded-lg transition-all duration-300 hover:scale-105"
          />
        </div>
        <div className="flex max-w-[400px] flex-col gap-4">
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
                    className={`rounded-md border border-[#e57905] p-1 text-sm transition-colors duration-300 hover:bg-[#e57905] hover:text-white  ${
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
                    className={`rounded-md border border-[#e57905] p-1 text-sm transition-colors duration-300 hover:bg-[#e57905] hover:text-white  ${
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
    </div>
  );
}
