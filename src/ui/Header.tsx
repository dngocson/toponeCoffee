import SearchMenu from "../features/menu/SearchMenu";
import { Link, NavLink } from "react-router-dom";
import { headerButton } from "../helper/const";
import Modal from "./Modal";
import { CartTable } from "../features/cart/CartTable";

function Header() {
  return (
    <div className="sticky top-0 z-[50] mt-8 flex flex-col items-center justify-center gap-8 bg-slate-400 pt-8">
      <div className="flex w-[1200px] items-center justify-between">
        <Link to="/" className="text-3xl font-bold uppercase text-blue-600">
          TOPONE Coffee
        </Link>
        <SearchMenu />
        <div className="flex gap-4 ">
          <Link to={"/login"}>Đăng nhập</Link>
          <Modal>
            <Modal.Open opens="cart">
              <button>Giỏ hàng</button>
            </Modal.Open>
            <Modal.Window name="cart">
              <CartTable />
            </Modal.Window>
          </Modal>
          <Link to="/settings">Settings</Link>
        </div>
      </div>
      <div className="w-[1200px]">
        <ul className="flex justify-between gap-2 text-lg uppercase">
          {headerButton.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive
                    ? "origin-left border-b-2 border-blue-600 text-xl text-blue-600 transition-colors duration-200"
                    : "origin-left  text-xl text-gray-900 duration-300  hover:text-blue-600"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
