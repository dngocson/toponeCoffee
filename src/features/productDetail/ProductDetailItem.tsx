import { useMenu } from "../menu/useMenu";
import { useParams } from "react-router-dom";
import { removeVietnameseTones } from "../../helper/helperFunctions";
import Spinner from "../../ui/Spinner";
import RelatedProduct from "./RelatedProduct";

const ProductdetailItem = () => {
  const routeParams = useParams();
  const { isLoading, menuItems } = useMenu();
  if (!menuItems) return <p>Du lieu tren sever trong</p>;
  if (isLoading) return <Spinner />;
  const currentProductName = routeParams.productId;
  const [currentProduct] = menuItems.data.filter(
    (product) => removeVietnameseTones(product.name) === currentProductName,
  );
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
      </div>
      <RelatedProduct id={currentProduct.id} data={currentProduct} />
    </div>
  );
};

export default ProductdetailItem;
