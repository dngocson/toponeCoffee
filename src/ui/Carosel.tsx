import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CarouselProps } from "./type";

function Carosel({ data, place }: { data: CarouselProps[]; place: string }) {
  const [slideNum, setSlideNum] = useState<number>(0);

  return (
    <div className="mx-auto w-[98%]">
      <Swiper
        className="relative mt-8 rounded-2xl "
        slidesPerView={1}
        onSlideChange={() =>
          setSlideNum((slide) => {
            if (slide < data.length - 1) return slide + 1;
            else return 0;
          })
        }
        height={500}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {place === "main" && (
          <div className="absolute right-[50%] top-[10%] z-10 flex translate-x-[50%] flex-col items-center justify-center gap-2 rounded-2xl bg-[#d1dfe7] bg-opacity-[85%] p-4 text-3xl font-bold text-gray-900 ">
            {slideNum !== 3 && <p>Trà sữa Top One chuyên phục vụ</p>}
            {slideNum == 3 && <p className="text-blue-700">Phục vụ 24/24</p>}
            <p className="text-blue-700">{data[slideNum]?.label}</p>
          </div>
        )}
        {data.map((item) => (
          <SwiperSlide className="relative" key={item.id}>
            <img className="h-[500px] w-full " src={item.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carosel;