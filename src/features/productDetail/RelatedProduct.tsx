import MenuItem from "../../ui/MenuItem";
import Spinner from "../../ui/Spinner";
import { MenuItemProps } from "../../ui/type";
import { useMenu } from "../menu/useMenu";

const RelatedProduct = ({ data }: { data: MenuItemProps }) => {
  const { menuItems, isLoading } = useMenu();
  if (isLoading) return <Spinner />;
  const { type: currentType, sub_type: currentSub_Type } = data;
  let relatedProduct;
  if (currentSub_Type)
    relatedProduct = menuItems?.data.filter(
      (item) => item.sub_type === currentSub_Type,
    );
  else
    relatedProduct = menuItems?.data.filter(
      (item) => item.type === currentType,
    );

  return (
    <div>
      <h2>Các sản phẩm liên quan</h2>
      <div className="grid grid-cols-5">
        {relatedProduct?.map((item) => <MenuItem data={item} />)}
      </div>
    </div>
  );
};

export default RelatedProduct;
