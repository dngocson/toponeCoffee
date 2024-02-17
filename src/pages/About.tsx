import { memo } from "react";
import nhanvien1 from "../assets/nhan vien tra sua.webp";
import nhanvien2 from "../assets/nhanvien.webp";

const About = memo(() => {
  return (
    <div className="container min-h-screen">
      <div className="flex flex-col gap-4 p-2">
        <h1 className=" text-3xl font-bold md:text-4xl">Giới thiệu</h1>
        <div className="flex flex-col gap-4 text-sm tracking-tight md:text-lg">
          <p>
            Luôn tâm huyết với việc khai thác nguồn nông sản Việt Nam để tạo ra
            những ly thức uống tươi ngon, an toàn và giàu giá trị dinh dưỡng.
          </p>
          <p>
            Top One mở cửa hàng đầu tiên vào năm 2013, mang trong mình lòng đam
            mê và khát vọng xây dựng một thương hiệu trà sữa thuần Việt, mang
            đậm hương vị quê hương.Top One tin rằng thưởng thức một ly trà sữa
            được pha chế từ trà Mộc Châu, trân châu từ sắn dây Nghệ An hay mứt
            dâu tằm từ Đà Lạt sẽ là những trải nghiệm hoàn toàn khác biệt và
            tuyệt vời nhất cho những khách hàng của mình.
          </p>
          <p>
            Cũng chính từ sự khác biệt đó, thương hiệu Top One đã có những bước
            phát triển thần tốc và dần chiếm lĩnh thị trường trà sữa với nhiều
            cửa hàng trải dài trên toàn quốc.
          </p>
          <p>
            Hành trình đầy đam mê và tâm huyết này sẽ tiếp tục nhân rộng để lan
            tỏa những ly trà thuần khiết nông sản Việt đến mọi miền trên Việt
            Nam và thế giới
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col justify-center gap-4 p-2 lg:flex-row">
        <img
          src={nhanvien1}
          alt="nhanvien1"
          className="rounded-2xl lg:h-[480px] lg:w-[480px] 2xl:h-[600px] 2xl:w-[600px]"
        />
        <img
          src={nhanvien2}
          alt="nhanvien1"
          className="rounded-2xl lg:h-[480px] lg:w-[480px] 2xl:h-[600px] 2xl:w-[600px]"
        />
      </div>
    </div>
  );
});

export default About;
