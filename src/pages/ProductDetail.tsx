import ProductdetailItem from "../features/productDetail/ProductDetailItem";
import ProductDetailLink from "../features/productDetail/ProductDetailLink";

function ProductDetail() {
  return (
    <div className="mx-auto my-8 w-[1200px]">
      <ProductDetailLink />
      <ProductdetailItem />
    </div>
  );
}

export default ProductDetail;
