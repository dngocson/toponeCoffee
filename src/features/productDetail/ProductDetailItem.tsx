import { useMenu } from "../menu/useMenu";
import { useParams } from "react-router-dom";
import { removeVietnameseTones } from "../../helper/helperFunctions";
import Spinner from "../../ui/Spinner";
import RelatedProduct from "./RelatedProduct";
import { useState } from "react";
import { iceLevel, suggarLevel } from "../../helper/const";
import { useAppDispatch } from "../redux/useAppDispatch ";
import { addItem } from "../redux/cart/cartSlice";
import Heading from "../../ui/Heading";

const ProductdetailItem = () => {
  const dispatch = useAppDispatch();
  const { isLoading, menuItems } = useMenu();
  const routeParams = useParams();
  const [iceLevelState, setIceLevel] = useState(100);
  const [suggarLevelState, setSuggarLevel] = useState(100);

  if (isLoading) return <Spinner />;

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
      quantity: 1,
      unitPrice: currentProduct.price,
      totalPrice: currentProduct.price * 1,
      iceLevel: currentProduct.type === "drink" ? iceLevelState : null,
      suggarLevel: currentProduct.type === "drink" ? suggarLevelState : null,
    };
    dispatch(addItem(newItem));
  }
  return (
    <div className="mt-8">
      <div className=" relative flex items-center gap-2 overflow-hidden rounded-xl ">
        <div>
          {currentProduct.promotion && (
            <p className="absolute left-[-56px] top-[21px] z-10 min-w-[300px] rotate-[-37deg] whitespace-nowrap bg-[#f00] py-[0.5rem] pr-[3rem] text-center text-xl font-bold uppercase tracking-widest text-white shadow-cardShadow2">
              {currentProduct.promotion}
            </p>
          )}
          <div className="h-[570px] w-[570px] overflow-hidden rounded-xl transition-all duration-300">
            <img
              className="h-[570px] w-[570px] rounded-xl shadow-cardShadow transition-all duration-300 hover:scale-110"
              src={currentProduct.image}
            />
          </div>
        </div>
        <div className="self-start">
          <p className="font-bold uppercase">{currentProduct.name}</p>
          <p>{currentProduct.price}đ</p>
          {currentProduct.type === "drink" && (
            <SelectIceLevelAndSuggarLevel
              suggarSelectMethod={setSuggarLevel}
              iceSelectMethod={setIceLevel}
              ice={iceLevelState}
              suggar={suggarLevelState}
            />
          )}
          <button onClick={onClickHandler}>Thêm vào giỏ hàng</button>
        </div>
      </div>
      <div className="my-8 flex flex-col gap-2">
        <Heading type="pri">Mô tả sản phẩm</Heading>
        <p>{currentProduct.description}</p>
      </div>
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
    <div className="flex flex-col">
      {iceLevel.map((level) => (
        <button
          key={level.id}
          className={`${level.value === ice ? "text-red-500" : ""}`}
          onClick={() => iceSelectMethod(level.value)}
        >
          {level.label}
        </button>
      ))}
      {suggarLevel.map((level) => (
        <button
          key={level.id}
          className={`${level.value === suggar ? "text-red-500" : ""}`}
          onClick={() => suggarSelectMethod(level.value)}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
}
