import Carosel from "../ui/Carosel";
import trasua1 from "../assets/coffee1.jpg";
import trasua2 from "../assets/coffee2.jpg";
// import trasua3 from "../assets/coffee3.jpg";
import comtrua1 from "../assets/comtrua1.jpg";
import shipper from "../assets/shipper-giao-hang.jpg";

import MainItems from "../features/main/MainItems";
// import comtrua3 from "../assets/comtrua3.jpg";

const data = [
  {
    id: 1,
    label: "Cà Phê, Trà sữa",
    img: trasua1,
  },
  {
    id: 2,
    label: "Mỳ cay 7 cấp",
    img: trasua2,
  },
  {
    id: 4,
    label: "Cơm trưa văn phòng",
    img: comtrua1,
  },
  {
    id: 3,
    label: "Free ship khu vực Thạch Hòa",
    img: shipper,
  },
  // {
  //   id: 6,
  //   label: "Phục vụ 24/24",
  //   img: comtrua3,
  // },
  // {
  //   id: 5,
  //   label: "Nhanh chóng, tiện lợi",
  //   img: comtrua2,
  // },
];
function Main() {
  return (
    <div>
      <Carosel data={data} place="main" />
      <MainItems />
    </div>
  );
}

export default Main;
