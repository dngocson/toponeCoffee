import Spinner from "../../ui/Spinner";
import { useMenu } from "../menu/useMenu";
import trasua from "../../assets/coffee2.jpg";
import mycay from "../../assets/mycay.jpg";
import comtrua from "../../assets/comtrua1.jpg";
import MenuItem from "../../ui/MenuItem";
// import { useState } from "react";
import { useSearchParams } from "react-router-dom";
const MainItems = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const drinkLimit = searchParams.get("drink") || "6";
  const noodleLimit = searchParams.get("noodle") || "6";
  const foodLimit = searchParams.get("food") || "6";

  function handleClick(target: string, value: string) {
    searchParams.set(target, Number(Number(value) + 4).toString());
    setSearchParams(searchParams);
  }

  const { isLoading, menuItems } = useMenu();
  if (isLoading) return <Spinner />;
  if (!menuItems) return <p>Du lieu tren sever trong</p>;

  const sortItemsByPromotion = (a: any, b: any) => {
    if (a.promotion && !b.promotion) {
      return -1;
    } else if (!a.promotion && b.promotion) {
      return 1;
    } else {
      return 0;
    }
  };

  const drinks = menuItems.data
    .filter((type) => type.type === "drink")
    .sort(sortItemsByPromotion);

  const noodles = menuItems.data
    .filter((type) => type.type === "noodle")
    .sort(sortItemsByPromotion);

  const foods = menuItems.data
    .filter((type) => type.type === "food")
    .sort(sortItemsByPromotion);

  return (
    <div className="mx-auto mt-12 flex w-[1200px] flex-col gap-8">
      <i className="self-center bg-gradient-to-r from-red-600 to-green-400 bg-clip-text p-2 text-4xl font-bold capitalize text-transparent  ">
        Cà phê và Trà sữa Top one
      </i>
      <div className="overflow-hidde8 relative flex  flex-wrap gap-8">
        <p className="absolute left-5 top-8 rounded-2xl bg-[#d1dfe7] bg-opacity-70 p-2 text-xl font-bold text-gray-900">
          Cà phê / Trà sữa
        </p>
        <img src={trasua} alt="" className="h-[370px] w-[570px] rounded-xl" />
        {drinks.slice(0, Number(drinkLimit)).map((drink) => (
          <MenuItem key={drink.id} data={drink} />
        ))}
      </div>
      {Number(drinkLimit) < drinks.length && (
        <button
          className="btn_g self-center p-2"
          // onClick={() => setDrinkVisible((prev) => prev + 4)}
          onClick={() => handleClick("drink", drinkLimit)}
        >
          Xem thêm
        </button>
      )}

      <i className="self-center bg-gradient-to-r from-red-600 to-green-400 bg-clip-text p-2 text-4xl font-bold capitalize text-transparent  ">
        Mỳ cay 7 cấp Top one
      </i>
      <div className="overflow-hidde8 relative flex flex-wrap gap-8">
        <p className="absolute left-5 top-8 rounded-2xl bg-green-300 bg-opacity-70 p-2 text-xl font-bold text-pink-600">
          Mỳ cay 7 cấp
        </p>
        <img
          src={mycay}
          alt=""
          className="object-fit h-[370px] w-[570px] rounded-xl"
        />
        {noodles.slice(0, Number(noodleLimit)).map((noodle) => (
          <MenuItem key={noodle.id} data={noodle} />
        ))}
      </div>

      {Number(noodleLimit) < noodles.length && (
        <button
          className="btn_g self-center p-2"
          // onClick={() => setNoodleVisible((prev) => prev + 4)}
          onClick={() => handleClick("noodle", noodleLimit)}
        >
          Xem thêm
        </button>
      )}

      <i className="self-center bg-gradient-to-r from-red-600 to-green-400 bg-clip-text p-2 text-4xl font-bold capitalize text-transparent  ">
        Quán cơm Top one
      </i>
      <div className="overflow-hidde8 relative flex flex-wrap gap-8">
        <p className="absolute left-5 top-8 rounded-2xl bg-yellow-100 bg-opacity-80 p-2 text-xl font-bold text-purple-700">
          Quán cơm Top one
        </p>
        <img
          src={comtrua}
          alt=""
          className="object-fit h-[370px] w-[570px] rounded-xl"
        />
        {foods.slice(0, Number(foodLimit)).map((food) => (
          <MenuItem key={food.id} data={food} />
        ))}
      </div>
      {Number(foodLimit) < foods.length && (
        <button
          className="btn_g self-center p-2"
          // onClick={() => setFoodVisible((prev) => prev + 4)}
          onClick={() => handleClick("food", foodLimit)}
        >
          Xem thêm
        </button>
      )}
    </div>
  );
};

export default MainItems;
