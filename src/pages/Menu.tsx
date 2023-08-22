import MenuItemList from "../features/menu/MenuItemList";
import MenuOperation from "../features/menu/MenuOperation";

function Menu() {
  return (
    <div className="container flex justify-center ">
      <MenuOperation />
      <MenuItemList />
    </div>
  );
}

export default Menu;
