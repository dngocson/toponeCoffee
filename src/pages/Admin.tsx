import { Link } from "react-router-dom";
import Heading from "../ui/Heading";

import { useLogout } from "../features/user/useLogout";
import { memo } from "react";

const Admin = memo(() => {
  const { logout, isLoading } = useLogout();
  return (
    <div className="container min-h-screen">
      <Heading type="pri">Trang quản lý</Heading>
      <div className="mt-5 flex flex-col gap-4 text-white">
        <Link
          className="w-max rounded-md bg-blue-500 p-2"
          to="/admin/dashboard"
        >
          Trang tổng hợp
        </Link>
        <Link className="w-max rounded-md bg-blue-500 p-2" to="/admin/order">
          Quản lí đơn
        </Link>
        <Link className="w-max rounded-md bg-blue-500 p-2" to="/admin/settings">
          Chỉnh sửa menu
        </Link>
        <button
          disabled={isLoading}
          onClick={() => logout()}
          className="w-max rounded-md bg-red-600 p-2"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
});

export default Admin;
