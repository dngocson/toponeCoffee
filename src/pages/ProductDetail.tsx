import { useMenu } from "../features/menu/useMenu";
import { useParams } from "react-router-dom";
import { removeVietnameseTones } from "../helper/helperFunctions";
import Spinner from "../ui/Spinner";
const ProductDetail = () => {
  const params = useParams();
  const { isLoading, menuItems } = useMenu();
  if (!menuItems) return <p>Du lieu tren sever trong</p>;
  if (isLoading) return <Spinner />;
  const currentProductName = params.productId;
  const [currentProduct] = menuItems.data.filter(
    (product) => removeVietnameseTones(product.name) === currentProductName,
  );

  return (
    <div className=" relative flex flex-col gap-2 overflow-hidden rounded-xl ">
      {currentProduct.promotion && (
        <p className="absolute left-[-56px] top-[21px] z-10 min-w-[200px] rotate-[-37deg] whitespace-nowrap bg-[#f00] px-[3rem] py-[0.2rem] text-center text-sm font-semibold uppercase text-white shadow-cardShadow2">
          {currentProduct.promotion}
        </p>
      )}
      <div className="h-[270px] w-[270px] overflow-hidden rounded-xl transition-all duration-300">
        <img
          className="h-[270px] w-[270px] rounded-xl shadow-cardShadow transition-all duration-300 hover:scale-110"
          src={currentProduct.image}
        />
      </div>
      <p>{currentProduct.description}</p>
      <p className="font-bold uppercase">{currentProduct.name}</p>
      <p>{currentProduct.price}đ</p>
    </div>
  );
};

export default ProductDetail;
