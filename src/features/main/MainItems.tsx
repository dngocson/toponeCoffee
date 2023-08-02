import Spinner from "../../ui/Spinner";
import { useMenu } from "../menu/useMenu";
import trasua from "../../assets/coffee2.jpg";
import mycay from "../../assets/mycay.jpg";
import comtrua from "../../assets/comtrua1.jpg";
import MenuItem from "../../ui/MenuItem";
const MainItems = () => {
  const { isLoading, menuItem } = useMenu();
  if (isLoading) return <Spinner />;
  if (!menuItem) return <p>Du lieu tren sever trong</p>;
  const drinks = menuItem.data.filter((type) => type.type === "drink");
  const noodles = menuItem.data.filter((type) => type.type === "noodle");
  const foods = menuItem.data.filter((type) => type.type === "food");
  return (
    <div className="mx-auto mt-12 flex w-[1200px] flex-col gap-8">
      <i className="self-center bg-gradient-to-r from-red-600 to-green-400 bg-clip-text p-2 text-4xl font-bold capitalize text-transparent  ">
        Cà phê và Trà sữa Top one
      </i>
      <div className="overflow-hidde8 relative flex flex-wrap gap-8">
        <p className="absolute left-5 top-8 rounded-2xl bg-[#d1dfe7] bg-opacity-70 p-2 text-xl font-bold text-gray-900">
          Cà phê / Trà sữa
        </p>
        <img src={trasua} alt="" className="h-[370px] w-[570px] rounded-xl" />
        {drinks.map((drink) => (
          <MenuItem key={drink.id} data={drink} />
        ))}
      </div>

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
        {noodles.map((noodle) => (
          <MenuItem key={noodle.id} data={noodle} />
        ))}
      </div>

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
        {foods.map((food) => (
          <MenuItem key={food.id} data={food} />
        ))}
      </div>
    </div>
  );
};

export default MainItems;
