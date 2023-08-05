import { useSearchParams } from "react-router-dom";

const MenuItemList = () => {
  const [searchParams] = useSearchParams();
  const currenntFilter = searchParams.get("type");

  return (
    <div className=" mx-8 h-[5000px]">
      <h1 className="text-2xl font-bold uppercase">
        {(currenntFilter === "all" || currenntFilter === "drink") && (
          <DrinkPart />
        )}
        {(currenntFilter === "all" || currenntFilter === "noodle") && (
          <NoodlePart />
        )}
        {(currenntFilter === "all" || currenntFilter === "food") && (
          <FoodPart />
        )}
      </h1>
    </div>
  );
};

function DrinkPart() {
  return (
    <div>
      <h1>Cà phê, trà sữa của top one</h1>
    </div>
  );
}
function NoodlePart() {
  return <p>noodle</p>;
}
function FoodPart() {
  return <p>food</p>;
}

export default MenuItemList;
