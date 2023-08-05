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

export const menuShortOption = [
  { value: "name-asc", label: "Theo tên (A-Z)" },
  { value: "name-desc", label: "Theo tên (Z-A)" },
  { value: "price-asc", label: "Theo giá (Thấp trước)" },
  { value: "price-desc", label: "Theo giá (Cao trước)" },
  { value: "id-desc", label: "Theo ngày tạo (gần nhất trước)" },
];
