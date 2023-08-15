import trasua1 from "../assets/coffee1.webp";
import trasua2 from "../assets/coffee2.webp";
import comtrua1 from "../assets/comtrua1.webp";
import shipper from "../assets/shipper-giao-hang.webp";

export const headerButton = [
  {
    label: "Trang chủ",
    url: "/",
    key: 1,
  },
  {
    label: "menu",
    url: "/menu?type=all",
    key: 3,
  },
  {
    label: "Giới thiệu",
    url: "/about",
    key: 2,
  },
  {
    label: "liên hệ",
    url: "/contact",
    key: 4,
  },
];

export const menuTypeOptions = [
  {
    value: "all",
    label: "Tất cả",
  },
  {
    value: "drink",
    label: "Nước",
  },
  {
    value: "noodle",
    label: "Mỳ cay",
  },
  {
    value: "food",
    label: "Cơm",
  },
];

export const menuOptionsWithSubTypes = [
  {
    value: "all",
    label: "Tất cả",
    type: "main",
  },
  {
    value: "drink",
    label: "Nước",
    type: "main",
    childrens: [
      { value: "drink_all", label: "Tất cả", type: "sub" },
      { value: "drink_tea", label: "Trà trái cây", type: "sub" },
      { value: "drink_yogurt", label: "Sữa chua", type: "sub" },
      { value: "drink_juice", label: "Nước ép, đá xay", type: "sub" },
      { value: "drink_milk-tea", label: "Trà sữa", type: "sub" },
      { value: "drink_other", label: "Thức uống khác", type: "sub" },
    ],
  },
  {
    value: "noodle",
    type: "main",
    label: "Mỳ cay",
  },
  {
    value: "food",
    type: "main",
    label: "Cơm",
  },
];

export const menuShortOption = [
  { value: "name-asc", label: "Theo tên (A-Z)" },
  { value: "name-desc", label: "Theo tên (Z-A)" },
  { value: "price-asc", label: "Theo giá: thấp đến cao" },
  { value: "price-desc", label: "Theo giá: cao đến thấp" },
  { value: "id-desc", label: "Theo ngày tạo (gần nhất trước)" },
];
export const menuShortOption1 = [
  { value: "id-desc", label: "Mới nhất" },
  { value: "price-asc", label: "Theo giá: thấp đến cao" },
  { value: "price-desc", label: "Theo giá: cao đến thấp" },
  { value: "name-asc", label: "Theo tên: (A-Z)" },
  { value: "name-desc", label: "Theo tên: (Z-A)" },
];

export const CarouselImage = [
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
    label: "Cơm  văn phòng",
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

export const cartRowLabel = [
  {
    id: 1,
    label: "Thông tin sản phẩm",
  },
  {
    id: 2,
    label: "Giá",
  },
  {
    id: 3,
    label: "Số lượng",
  },
  {
    id: 4,
    label: "Thành tiền",
  },
];

export const orderStatusOptions = [
  {
    id: 1,
    label: "Chờ xác nhận",
    value: "pending",
  },
  {
    id: 2,
    label: "Đã xác nhận",
    value: "confirmed",
  },
  {
    id: 3,
    label: "Đã hoàn thành",
    value: "completed",
  },
];

export const suggarLevel = [
  { id: 5, value: 100, label: "100% đường" },
  { id: 4, value: 70, label: "70% đường" },
  { id: 3, value: 50, label: "50% đường" },
  { id: 2, value: 30, label: "30% đường" },
  { id: 1, value: 0, label: "Không đường" },
];
export const iceLevel = [
  { id: 5, value: 100, label: "100% đá" },
  { id: 4, value: 70, label: "70% đá" },
  { id: 3, value: 50, label: "50% đá" },
  { id: 2, value: 30, label: "30% đá" },
  { id: 1, value: 0, label: "Không đá" },
];
