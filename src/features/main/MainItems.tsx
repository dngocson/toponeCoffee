import Spinner from "../../ui/Spinner";
import { useMenu } from "../menu/useMenu";
import trasua from "../../assets/coffee2.webp";
import mycay from "../../assets/mycay.webp";
import comtrua from "../../assets/comtrua1.webp";
import MenuItem from "../../ui/MenuItem";
import { motion } from "framer-motion";
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
  if (!menuItems) return <p>Đang tải dữ liệu từ server</p>;

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
    <div className="mx-auto mt-12 flex max-w-[1200px] flex-col gap-8">
      <motion.i
        viewport={{ once: true }}
        initial={{ x: -1000, opacity: 0 }}
        transition={{ duration: 0.3, type: "spring", delay: 0.2 }}
        animate={{ x: 0, opacity: 1 }}
        className="self-center bg-gradient-to-r from-red-600 to-green-400 bg-clip-text p-2 text-center text-3xl font-bold capitalize text-transparent md:text-4xl"
      >
        Cà phê và Trà sữa Top One
      </motion.i>
      <div className="relative flex flex-wrap justify-center gap-4 overflow-hidden px-1 md:gap-8 md:px-8 xl:px-0">
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <img
            src={trasua}
            alt="hình trà sữa"
            className="object-fit h-full w-[450px] rounded-xl   lg:h-[370px] xl:w-[570px] "
          />
        </motion.div>
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

      <motion.i
        viewport={{ once: true }}
        initial={{ x: -1000, opacity: 0 }}
        transition={{ duration: 0.3, type: "spring", delay: 0.2 }}
        animate={{ x: 0, opacity: 1 }}
        className="self-center bg-gradient-to-r from-red-600 to-green-400 bg-clip-text p-2 text-center text-3xl font-bold capitalize text-transparent md:text-4xl"
      >
        Mỳ cay Top One
      </motion.i>
      <div className="relative flex flex-wrap  justify-center gap-4 overflow-hidden px-1 md:gap-8 md:px-8 xl:px-0">
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <img
            src={mycay}
            alt="hinh my"
            className="object-fit h-full w-[450px] rounded-xl md:w-[700px] xl:h-[370px] xl:w-[570px]"
          />
        </motion.div>

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

      <motion.i
        viewport={{ once: true }}
        initial={{ x: -1000, opacity: 0 }}
        transition={{ duration: 0.3, type: "spring", delay: 0.2 }}
        animate={{ x: 0, opacity: 1 }}
        className="self-center bg-gradient-to-r from-red-600 to-green-400 bg-clip-text p-2 text-center text-3xl font-bold capitalize text-transparent md:text-4xl"
      >
        Cơm văn phòng Top One
      </motion.i>

      <div className="relative flex flex-wrap justify-center gap-4 overflow-hidden px-1 md:gap-8 md:px-8 xl:px-0">
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <img
            src={comtrua}
            alt="hình cơm trưa"
            className="object-fit  h-full w-[450px] rounded-xl md:w-[700px] xl:h-[370px] xl:w-[570px]"
          />
        </motion.div>
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
