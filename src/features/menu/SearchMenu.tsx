import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchMenu = () => {
  const [query, setQuery] = useState<string>("");
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <form onSubmit={submitHandler} className="relative">
      <input
        placeholder="Tìm kiếm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-[350px] rounded-xl  bg-cyan-50 p-2 transition-all duration-300 focus:w-[500px] focus:outline-none focus:ring focus:ring-blue-600 focus:ring-opacity-70"
      />
      <div className="absolute inset-y-0 right-2  flex items-center pl-3">
        <button type="submit">
          <BiSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchMenu;
