import MenuItemList from "../features/menu/MenuItemList";
import MenuOperation from "../features/menu/MenuOperation";

function Menu() {
  return (
    <div className="mx-auto mt-8 flex max-w-[1200px] ">
      <MenuOperation />
      <MenuItemList />
    </div>
  );
}

export default Menu;
