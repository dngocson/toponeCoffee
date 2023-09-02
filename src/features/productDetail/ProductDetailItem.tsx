import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useMenu } from "../menu/useMenu";
import { useAppDispatch } from "../redux/useAppDispatch ";
import { addItem } from "../redux/cart/cartSlice";

import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import RelatedProduct from "./RelatedProduct";

import {
  formatCurrencyNumber,
  removeVietnameseTones,
} from "../../helper/helperFunctions";
import { iceLevel, suggarLevel } from "../../helper/const";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

const ProductdetailItem = () => {
  const dispatch = useAppDispatch();
  const { isLoading, menuItems } = useMenu();
  const routeParams = useParams();
  const [iceLevelState, setIceLevel] = useState(100);
  const [suggarLevelState, setSuggarLevel] = useState(100);
  const [quantity, setQuantity] = useState(1);
  if (isLoading) return <Spinner />;
  function decreaseQuantityHandler() {
    if (quantity === 1) return;
    setQuantity((quantity) => quantity - 1);
  }
  function increaseQuantityHandler() {
    setQuantity((quantity) => quantity + 1);
  }

  const currentProductName = routeParams.productId;
  const [currentProduct] =
    menuItems?.data.filter(
      (product) => removeVietnameseTones(product.name) === currentProductName,
    ) || [];

  // Begin Dispatch Logic
  function onClickHandler() {
    const newItem = {
      id: currentProduct.id,
      image: currentProduct.image,
      name: currentProduct.name,
      quantity: quantity,
      unitPrice: currentProduct.price,
      totalPrice: currentProduct.price * quantity,
      iceLevel: currentProduct.hasSI_level === "true" ? iceLevelState : null,
      suggarLevel:
        currentProduct.hasSI_level === "true" ? suggarLevelState : null,
    };
    dispatch(addItem(newItem));
    toast.success("Đã thêm vào giỏ hàng");
    setQuantity(1);
  }
  return (
    <div className=":mt-8 mt-4 p-4 xl:p-0">
      <div className=" flex flex-col items-center gap-2 rounded-xl lg:flex-row ">
        <div>
          <div className="relative overflow-hidden">
            {currentProduct.promotion && (
              <p className="px-3rem absolute  left-[-94px] top-[28px] z-10 min-w-[300px] rotate-[-37deg]  whitespace-nowrap bg-[#f00] py-[0.3rem] text-center text-base font-bold uppercase tracking-widest text-white shadow-cardShadow2 largePhone:left-[-78px] largePhone:top-[34px] largePhone:py-[0.4rem] largePhone:text-lg md:left-[-107px] md:top-[62px] md:px-32    md:text-2xl">
                <p className="text-center md:min-w-[200px] ">
                  {currentProduct.promotion}
                </p>
              </p>
            )}
            <div className="overflow-hidden rounded-xl  lg:h-[570px] lg:w-[570px] ">
              <img
                className="shadow-cardShadow rounded-xl transition-all duration-300 hover:scale-110 lg:h-[570px] lg:w-[570px]"
                src={currentProduct.image}
              />
            </div>
          </div>
        </div>
        <div className=" w-full self-start  lg:ml-8">
          <div className="flex flex-col gap-3">
            <h1 className=" mt-4 text-3xl font-bold capitalize sm:text-4xl lg:mt-0">
              {currentProduct.name}
            </h1>
            <Heading
              addStyle="text-[#e57905] text-2xl tracking-tighter"
              type="pri"
            >
              {formatCurrencyNumber(
                (currentProduct.price * quantity).toString(),
              )}
              đ
            </Heading>
          </div>

          <div className="mt-4 flex items-center gap-2 text-lg lg:mt-8">
            <p>Số lượng:</p>
            <button
              className="rounded-full text-3xl text-[#e57905] disabled:cursor-not-allowed"
              onClick={decreaseQuantityHandler}
              disabled={quantity === 1}
            >
              <AiFillMinusCircle />
            </button>
            <p className="text-lg font-bold">{quantity}</p>
            <button
              className="rounded-full text-3xl text-[#e57905] "
              onClick={increaseQuantityHandler}
            >
              <AiFillPlusCircle />
            </button>
          </div>

          {currentProduct.hasSI_level === "true" && (
            <SelectIceLevelAndSuggarLevel
              suggarSelectMethod={setSuggarLevel}
              iceSelectMethod={setIceLevel}
              ice={iceLevelState}
              suggar={suggarLevelState}
            />
          )}
          {currentProduct.hasSI_level !== "true" && (
            <div className="my-4 flex flex-col gap-2 lg:my-8">
              <Heading type="pri">Mô tả sản phẩm</Heading>
              <p>{currentProduct.description}</p>
            </div>
          )}

          <button
            className="mt-6 w-full  rounded-xl bg-[#e57905] p-2 text-white transition-all duration-300 hover:bg-opacity-[85%] lg:mt-10"
            onClick={onClickHandler}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      {currentProduct.hasSI_level === "true" && (
        <div className="my-8 flex flex-col gap-2">
          <Heading type="pri">Mô tả sản phẩm</Heading>
          <p>{currentProduct.description}</p>
        </div>
      )}
      <RelatedProduct id={currentProduct.id} data={currentProduct} />
    </div>
  );
};

export default ProductdetailItem;

interface SelectIceLevelAndSuggarLevelProps {
  suggarSelectMethod: (value: number) => void;
  iceSelectMethod: (value: number) => void;
  ice: number;
  suggar: number;
}

function SelectIceLevelAndSuggarLevel({
  suggarSelectMethod,
  iceSelectMethod,
  ice,
  suggar,
}: SelectIceLevelAndSuggarLevelProps) {
  return (
    <div className="mt-8 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Chọn mức đường của bạn:</h2>
        <div className="flex flex-wrap gap-4">
          {suggarLevel.map((level) => (
            <button
              key={level.id}
              className={`rounded-md border border-[#e57905] p-2 text-sm transition-colors duration-300 hover:bg-[#e57905] hover:text-white md:text-base ${
                level.value === suggar ? " bg-[#e57905] text-white" : " "
              }`}
              onClick={() => suggarSelectMethod(level.value)}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Chọn mức đá của bạn:</h2>
        <div className="flex flex-wrap  gap-4">
          {iceLevel.map((level) => (
            <button
              key={level.id}
              className={`rounded-md border border-[#e57905] p-2 text-sm transition-colors duration-300 hover:bg-[#e57905] hover:text-white md:text-base  ${
                level.value === ice
                  ? "bg-[#e57905] text-white"
                  : "border-[#e57905] "
              }`}
              onClick={() => iceSelectMethod(level.value)}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
