import ProductdetailItem from "../features/productDetail/ProductDetailItem";
import ProductDetailLink from "../features/productDetail/ProductDetailLink";

function ProductDetail() {
  return (
    <div className="container">
      <ProductDetailLink />
      <ProductdetailItem />
    </div>
  );
}

export default ProductDetail;
