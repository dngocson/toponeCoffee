import { BsFacebook } from "react-icons/bs";
import { HiLocationMarker, HiOutlineMail, HiPhone } from "react-icons/hi";
import { Link } from "react-router-dom";
import trasua from "../assets/iconMilkTea.png";
function Footer() {
  return (
    <div className="bg-[#262626] ">
      <div className="container ">
        <h2 className="hidden pt-8 text-center text-5xl text-white lg:block">
          Trà sữa Top One
        </h2>
        <div className="grid grid-cols-3 gap-4 p-4 text-sm text-white">
          <div className="col-span-3 flex items-center justify-center md:justify-start lg:col-span-1 lg:justify-center">
            <img
              className="max-w-[30%] md:max-w-[40%] lg:max-w-[60%]"
              src={trasua}
            />
            <h2 className="whitespace-nowrap text-2xl md:text-4xl lg:hidden">
              Trà sữa Top One
            </h2>
          </div>
          <div className="col-span-3 lg:col-span-1 xl:pt-4">
            <h2 className="py-2  text-xl text-white xl:text-2xl">
              Thông tin liên hệ
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <div className="flex items-center gap-4">
                  <p className="text-xl">
                    <HiLocationMarker />
                  </p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=20.987163,105.536492`}
                    target="blank"
                  >
                    Chân cầu vượt Bắc Phú Cát, Thạch Hòa, Thạch Thất, Hà Nội
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center  gap-4">
                  <p className="text-xl">
                    <HiPhone />
                  </p>
                  <a href="tel:+84372000318">037.2000.318</a>
                </div>
              </li>

              <li>
                <div className="flex items-center  gap-4">
                  <p className="text-xl">
                    <HiOutlineMail />
                  </p>
                  <a href="mailto:dothanhhung122000@gmail.com">
                    dothanhhung122000@gmail.com
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center  gap-4">
                  <p className="text-xl">
                    <BsFacebook />
                  </p>
                  <a
                    href="https://www.facebook.com/TraSuaTopOne"
                    target="blank"
                  >
                    Trà sữa Top One
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-span-3 lg:col-span-1 xl:pt-4">
            <h2 className="py-2 text-xl text-white xl:text-2xl">
              Về chúng tôi
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to={"/menu"}>Thực đơn của Top One</Link>
              </li>
              <li>
                <Link to={"/about"}>Giới thiệu về Top One</Link>
              </li>
              <li>
                <Link to={"/contact"}>Liên hệ</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
