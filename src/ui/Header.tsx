import SearchMenu from "../features/menu/SearchMenu";
import { Link, NavLink } from "react-router-dom";
import { headerButton } from "../helper/const";
import Modal from "./Modal";
import { CartTable } from "../features/cart/CartTable";
import { useEffect, useState } from "react";
import { AiFillSetting, AiOutlineLogin, AiOutlineMenu } from "react-icons/ai";
import { HiXMark } from "react-icons/hi2";
import { FaListAlt } from "react-icons/fa";
import { BsFillCartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { getTotalCartQuantity } from "../features/redux/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../features/user/useUser";
import Spinner from "./Spinner";

function Header() {
  const [showNav, setShowNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const { isLoading, isAuthenticated } = useUser();
  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 50) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
    return () => window.removeEventListener("scroll", handleShadow);
  }, []);
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  if (isLoading) return <Spinner />;
  return (
    <div
      className={`sticky top-0  z-[50] mt-8 flex flex-col items-center justify-center gap-8 bg-blue-300 py-6  backdrop-blur-sm ${
        shadow ? "bg-opacity-90 shadow-xl" : null
      }`}
    >
      <div className="hidden w-full max-w-[1200px] flex-col gap-5 lg:flex">
        <div className=" flex  items-center justify-between gap-4 px-6 lg:max-w-[1200px] xl:px-0">
          <Link
            to="/"
            className="whitespace-nowrap text-3xl font-bold uppercase tracking-tight text-blue-600"
          >
            Trà sữa Top One
          </Link>
          <SearchMenu />
          <div className="flex items-center gap-4">
            <Modal>
              <Modal.Open opens="cart">
                <button className="text-black">
                  <div className="flex items-center justify-center gap-1 text-2xl">
                    <BsFillCartFill />
                    <p className="text-xl ">{totalCartQuantity}</p>
                  </div>
                </button>
              </Modal.Open>
              <Modal.Window name="cart">
                <CartTable />
              </Modal.Window>
            </Modal>
            <Link to={"/find"}>
              <div className="text-2xl text-black">
                <FaListAlt />
              </div>
            </Link>
            {!isAuthenticated && (
              <Link to={"/login"}>
                <div className="text-2xl text-black">
                  <AiOutlineLogin />
                </div>
              </Link>
            )}
            {isAuthenticated && (
              <Link to={"/admin"}>
                <div className="text-2xl text-orange-600">
                  <AiFillSetting />
                </div>
              </Link>
            )}
          </div>
        </div>
        <ul className=" flex  items-center justify-between gap-4 px-6 text-lg uppercase  lg:max-w-[1200px] xl:px-0">
          {headerButton.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive
                    ? "  text-xl text-blue-600 transition-colors duration-300"
                    : "  text-xl text-gray-900 transition-colors  duration-300  hover:text-blue-600"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className=" flex w-full items-center justify-between px-4 lg:hidden">
        <button
          onClick={() => setShowNav((nav) => !nav)}
          className="  text-xl font-bold"
        >
          <AiOutlineMenu />
        </button>
        <h2 className="text-xl font-semibold text-[#e57905] md:text-4xl">
          Trà sữa Top One
        </h2>
        <Modal>
          <Modal.Open opens="cart">
            <button className="text-xl text-black">
              <div className="flex items-center justify-center gap-1">
                <BsFillCartFill />
                <p className="text-base ">{totalCartQuantity}</p>
              </div>
            </button>
          </Modal.Open>
          <Modal.Window name="cart">
            <CartTable />
          </Modal.Window>
        </Modal>
      </div>

      <AnimatePresence>
        {showNav && (
          <div
            onClick={() => {
              // e.stopPropagation();
              setShowNav((nav) => !nav);
            }}
            className="absolute left-0 top-0 h-screen w-full backdrop-blur-sm "
          >
            <motion.div
              exit={{ x: "-100vw", opacity: 0 }}
              initial={{ x: "-100vw", opacity: 0 }}
              transition={{ duration: 0.2, type: "tween" }}
              animate={{ y: 0, x: 0, opacity: 1 }}
              className="h-screen w-[70%] bg-white shadow-xl transition-all duration-500 md:w-[40%]"
            >
              <div className="relative flex flex-col items-center justify-center p-4">
                <button
                  className=" self-end rounded-sm border-0  p-1 text-xl font-bold text-black transition-all duration-200 hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNav((nav) => !nav);
                  }}
                >
                  <HiXMark />
                </button>
                <h2 className="my-4 w-full border-b-2  border-[#e57905] text-xl font-bold text-[#e57905] md:text-3xl">
                  Top one coffee
                </h2>
                <ul className="flex w-full flex-col gap-4 self-start pl-8 pt-4 text-base">
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNav((nav) => !nav);
                    }}
                    className="w-full "
                  >
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "origin-left  text-xl text-[#e57905] transition-colors duration-200"
                          : "origin-left  text-xl text-gray-900 duration-300  hover:text-[#e57905]"
                      }
                      to="/"
                    >
                      Trang chủ
                    </NavLink>
                  </li>
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNav((nav) => !nav);
                    }}
                    className="w-full "
                  >
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "origin-left  text-xl text-[#e57905] transition-colors duration-200"
                          : "origin-left  text-xl text-gray-900 duration-300  hover:text-[#e57905]"
                      }
                      to="/menu?type=all"
                    >
                      Menu
                    </NavLink>
                  </li>
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNav((nav) => !nav);
                    }}
                    className="w-full "
                  >
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "origin-left  text-xl text-[#e57905] transition-colors duration-200"
                          : "origin-left  text-xl text-gray-900 duration-300  hover:text-[#e57905]"
                      }
                      to="/about"
                    >
                      Giới thiệu
                    </NavLink>
                  </li>
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNav((nav) => !nav);
                    }}
                    className="w-full "
                  >
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "origin-left  text-xl text-[#e57905] transition-colors duration-200"
                          : "origin-left  text-xl text-gray-900 duration-300  hover:text-[#e57905]"
                      }
                      to="/contact"
                    >
                      Liên hệ
                    </NavLink>
                  </li>
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNav((nav) => !nav);
                    }}
                    className="w-full "
                  >
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "origin-left  text-xl text-[#e57905] transition-colors duration-200"
                          : "origin-left  text-xl text-gray-900 duration-300  hover:text-[#e57905]"
                      }
                      to="/find"
                    >
                      Tìm đơn hàng
                    </NavLink>
                  </li>
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNav((nav) => !nav);
                    }}
                    className="w-full "
                  >
                    {!isAuthenticated && (
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "origin-left  text-xl text-[#e57905] transition-colors duration-200"
                            : "origin-left  text-xl text-gray-900 duration-300  hover:text-[#e57905]"
                        }
                        to="/login"
                      >
                        Đăng nhập
                      </NavLink>
                    )}
                    {isAuthenticated && (
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "origin-left  text-xl text-[#e57905] transition-colors duration-200"
                            : "origin-left  text-xl text-gray-900 duration-300  hover:text-[#e57905]"
                        }
                        to="/admin"
                      >
                        Quản lí
                      </NavLink>
                    )}
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
