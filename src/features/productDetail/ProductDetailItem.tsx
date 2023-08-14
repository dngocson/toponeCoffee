import { useMenu } from "../menu/useMenu";
import { useParams } from "react-router-dom";
import { removeVietnameseTones } from "../../helper/helperFunctions";
import Spinner from "../../ui/Spinner";
import RelatedProduct from "./RelatedProduct";
import { useState } from "react";
import { iceLevel, suggarLevel } from "../../helper/const";

const ProductdetailItem = () => {
  const routeParams = useParams();
  const { isLoading, menuItems } = useMenu();
  const [suggarLevelState, setSuggarLevel] = useState(100);
  const [iceLevelState, setIceLevel] = useState(100);

  if (isLoading) return <Spinner />;
  const currentProductName = routeParams.productId;
  const [currentProduct] =
    menuItems?.data.filter(
      (product) => removeVietnameseTones(product.name) === currentProductName,
    ) || [];
  return (
    <div>
      <div className=" relative flex flex-col gap-2 overflow-hidden rounded-xl ">
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
        <p>{currentProduct.description}</p>
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
      </div>
      <button>Thêm vào giỏ hàng</button>
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
    <div>
      {iceLevel.map((level) => (
        <button
          className={`${level.value === ice ? "text-red-500" : ""}`}
          onClick={() => iceSelectMethod(level.value)}
        >
          {level.label}
        </button>
      ))}
      {suggarLevel.map((level) => (
        <button
          className={`${level.value === suggar ? "text-red-500" : ""}`}
          onClick={() => suggarSelectMethod(level.value)}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
}
