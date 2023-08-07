import { Link, useParams } from "react-router-dom";
import {
  convertSubTypeName,
  convertTypeName,
  removeVietnameseTones,
} from "../../helper/helperFunctions";
import { useMenu } from "../menu/useMenu";
import Spinner from "../../ui/Spinner";

const ProductDetailLink = () => {
  const routeParams = useParams();
  const { isLoading, menuItems } = useMenu();
  if (!menuItems) return <p>Du lieu tren sever trong</p>;
  if (isLoading) return <Spinner />;
  const currentProductName = routeParams.productId;
  const [currentProduct] = menuItems.data.filter(
    (product) => removeVietnameseTones(product.name) === currentProductName,
  );
  const subType = convertSubTypeName(currentProduct.sub_type) || "";
  const hasSubType = subType?.length > 0 ? true : false;
  return (
    <div className="flex gap-4 text-lg">
      <Link className="font-bold" to="/">
        Trang chủ
      </Link>
      <span>/</span>
      <Link className="font-bold" to="/menu">
        Menu
      </Link>
      <span>/</span>
      <>
        <Link
          className="font-bold"
          to={`/menu?type=${
            hasSubType ? currentProduct.sub_type : currentProduct.type
          }`}
        >
          {hasSubType
            ? convertSubTypeName(currentProduct.sub_type)
            : convertTypeName(currentProduct.type)}
        </Link>
        <span>/</span>
      </>
      <p>{currentProduct.name}</p>
    </div>
  );
};

export default ProductDetailLink;
