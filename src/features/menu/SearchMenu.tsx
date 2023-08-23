import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useMenu } from "./useMenu";
import Spinner from "../../ui/Spinner";
import { removeVietnameseTones } from "../../helper/helperFunctions";
import { MenuItemProps } from "../../ui/type";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SearchMenu = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { isLoading, menuItems } = useMenu();
  if (isLoading) return <Spinner />;
  const menuList = menuItems?.data || [];
  const menulistEng = menuList.map((item) => ({
    ...item,
    engName: removeVietnameseTones(item.name).replace(/-/g, " "),
  }));

  function submitHandler(e: any) {
    e.preventDefault();
    if (renderData.length === 1) {
      navigate(`/menu/${renderData[0].engName?.replace(/ /g, "-")}`);
      setQuery("");
    } else return;
  }
  const renderData = menulistEng.filter((item) =>
    item.engName.includes(removeVietnameseTones(query).replace(/-/g, " ")),
  );
  function onblurHandler() {
    setTimeout(() => {
      setQuery("");
    }, 200);
  }
  return (
    <form onSubmit={submitHandler} className="relative">
      <div className="relative mx-auto w-[70%] lg:w-[100%]">
        <input
          placeholder="Tìm kiếm"
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl bg-cyan-50  p-2 transition-all duration-300  focus:outline-none focus:ring focus:ring-blue-600 focus:ring-opacity-70 lg:w-[350px] lg:focus:w-[500px]"
          onBlur={onblurHandler}
        />
        <div className="absolute inset-y-0 right-2 flex items-center pl-3">
          <button type="submit">
            <BiSearch />
          </button>
        </div>
      </div>
      <SearchResult query={query} renderData={renderData} />
    </form>
  );
};
function SearchResult({
  query,
  renderData,
}: {
  query: string;
  renderData: MenuItemProps[];
}) {
  return (
    <div className="absolute top-[45px] max-h-[500px] w-[100%] overflow-x-hidden bg-slate-50">
      {query &&
        renderData.map((item) => (
          <div
            className="group border-b border-slate-500 bg-white transition-all duration-300 hover:bg-gray-200"
            key={item.id}
          >
            <Link to={`/menu/${item.engName?.replace(/ /g, "-")}`}>
              <div className="flex items-center gap-2 p-1">
                <img
                  className="h-[60px] w-[60px]"
                  src={item.image}
                  alt="hình ảnh sản phẩm"
                />
                <div>
                  <p className="font-semibold group-hover:scale-105 group-hover:text-blue-700">
                    {item.name}
                  </p>
                  <p>
                    {item.price}
                    <span className="text-sm tracking-wider">đ</span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}
export default SearchMenu;
