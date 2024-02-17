import { useEffect, useState } from "react";
import { AiFillSetting, AiOutlineLogin, AiOutlineMenu } from "react-icons/ai";
import { CiCircleList } from "react-icons/ci";
import { HiXMark } from "react-icons/hi2";
import { LuShoppingCart } from "react-icons/lu";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CartTable } from "../features/cart/CartTable";
import SearchMenu from "../features/menu/SearchMenu";
import { headerButton } from "../helper/const";
import Modal from "./Modal";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../features/user/useUser";
import Spinner from "./Spinner";
// import { useSelector } from "react-redux";
// import { getTotalCartQuantity } from "../features/redux/cart/cartSlice";

function Header() {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  const [activeLinkKey, setActiveLinkKey] = useState(0);
  const [shadow, setShadow] = useState(false);
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (/^\/$/.test(location.pathname)) setActiveLinkKey(1);
    else if (/^\/menu/.test(location.pathname)) setActiveLinkKey(3);
    else if (/^\/about/.test(location.pathname)) setActiveLinkKey(2);
    else if (/^\/contact/.test(location.pathname)) setActiveLinkKey(4);
    else setActiveLinkKey(0);
  }, [location]);

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
  // const totalCartQuantity = useSelector(getTotalCartQuantity);
  if (isLoading) return <Spinner />;
  return (
    <div
      className={`sticky top-0  z-[50] mt-6 flex  items-center justify-center gap-8 bg-[#D9F8FF] py-4 backdrop-blur-sm ${
        shadow ? "bg-opacity-90 shadow-xl" : null
      }`}
    >
      <div className="hidden w-full max-w-[1400px] items-center justify-between gap-5 lg:flex">
        <div className="flex whitespace-nowrap lg:max-w-[80%] lg:gap-4 2xl:max-w-[50%] 2xl:gap-10">
          <Link
            to="/"
            className="whitespace-nowrap rounded-lg bg-[#20BDDF] px-2 font-bold
            uppercase tracking-tighter text-white lg:text-[20px] 2xl:text-[28px]"
          >
            TOPONE COFFEE
          </Link>
          <ul className="flex w-full items-center justify-between gap-4 px-6 text-lg uppercase xl:px-0">
            {headerButton.map((item) => (
              <li className="relative" key={item.key}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white transition-colors duration-300 lg:text-[15px] 2xl:text-[17px]"
                      : "text-gray-900 transition-colors duration-300 hover:text-blue-600 lg:text-[15px] 2xl:text-[17px]"
                  }
                >
                  <p className="relative z-10 px-2 py-1">{item.label}</p>
                  {activeLinkKey === item.key && (
                    <motion.span
                      layoutId="link-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute bottom-0 left-0 z-[5] h-full  w-full rounded-lg bg-[#20BDDF]"
                    ></motion.span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex max-w-[50%] gap-8">
          <SearchMenu />
          <div className="flex items-center gap-4">
            <Modal>
              <Modal.Open opens="cart">
                <button className="text-black">
                  <div className="flex items-center justify-center gap-1 text-2xl">
                    <div className="rounded-full bg-[#20BDDF] p-2 text-white">
                      <LuShoppingCart />
                    </div>
                    {/* <p className="text-xl ">{totalCartQuantity}</p> */}
                  </div>
                </button>
              </Modal.Open>
              <Modal.Window name="cart">
                <CartTable />
              </Modal.Window>
            </Modal>
            <Link to={"/find"}>
              <div className="rounded-full bg-[#20BDDF] p-2 text-2xl text-white">
                <CiCircleList />
              </div>
            </Link>
            {!isAuthenticated && (
              <Link to={"/login"}>
                <div className="rounded-full bg-[#20BDDF] p-2 text-2xl text-white">
                  <AiOutlineLogin />
                </div>
              </Link>
            )}
            {isAuthenticated && (
              <Link to={"/admin"}>
                <div className="rounded-full bg-[#20BDDF] p-2 text-2xl text-white">
                  <AiFillSetting />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className=" flex w-full items-center justify-between px-4 lg:hidden">
        <button
          onClick={() => setShowNav((nav) => !nav)}
          className="  text-xl font-bold"
        >
          <AiOutlineMenu />
        </button>
        <h2 className="text-xl font-semibold text-[#20BDDF] md:text-4xl">
          Trà sữa Top One
        </h2>
        <Modal>
          <Modal.Open opens="cart">
            <button className="text-xl text-black">
              <div className="flex items-center justify-center gap-1">
                <LuShoppingCart />
                {/* <p className="text-base ">{totalCartQuantity}</p> */}
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
