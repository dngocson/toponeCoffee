import MenuItem from "../../ui/MenuItem";
import Spinner from "../../ui/Spinner";
import { MenuItemProps } from "../../ui/type";
import { useMenu } from "../menu/useMenu";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

// Import Swiper styles

//
const RelatedProduct = ({ data, id }: { data: MenuItemProps; id: number }) => {
  const { menuItems, isLoading } = useMenu();
  if (isLoading) return <Spinner />;
  const { type: currentType, sub_type: currentSub_Type } = data;
  let relatedProduct;
  if (currentSub_Type)
    relatedProduct = menuItems?.data
      .filter((item) => item.sub_type === currentSub_Type)
      .filter((item) => item.id !== id);
  else
    relatedProduct = menuItems?.data
      .filter((item) => item.type === currentType)
      .filter((item) => item.id !== id);

  return (
    <div>
      <h2>Các sản phẩm liên quan</h2>
      <Swiper
        autoHeight={true}
        loop={true}
        className="productDetail"
        slidesPerView={4}
        loopedSlides={3}
        autoplay={{
          delay: 2000,

          pauseOnMouseEnter: true,
        }}
        spaceBetween={10}
        preventClicksPropagation={true}
        modules={[Autoplay]}
      >
        {relatedProduct?.map((item) => (
          <SwiperSlide key={item.id}>
            <MenuItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedProduct;
