import { useSearchParams } from "react-router-dom";
import { useMenu } from "./useMenu";
import Spinner from "../../ui/Spinner";
import { MenuItemListProps } from "./type";
import MenuItem from "../../ui/MenuItem";

const MenuItemList = () => {
  const [searchParams] = useSearchParams();
  const currenntFilter = searchParams.get("type");
  const type = currenntFilter?.split("_").at(0) || "all";
  const subType = currenntFilter?.split("_").at(1) || "";
  const { isLoading, menuItems } = useMenu();
  if (isLoading) return <Spinner />;
  if (!menuItems) return <p>Du lieu tren sever trong</p>;
  const drinks = menuItems.data.filter((type) => type.type === "drink");
  const noodles = menuItems.data.filter((type) => type.type === "noodle");
  const foods = menuItems.data.filter((type) => type.type === "food");

  // const test = drinks.filter((item) => item.sub_type === "drink_tea");
  // console.log(test);
  return (
    <div className=" mx-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold uppercase">
        {type === "all" ? <p>Menu của Top One</p> : undefined}
        {(type === "all" || type === "drink") && (
          <SectionPart
            type={type}
            message="Cà phê, trà sữa Top One"
            subType={subType}
            data={drinks}
          />
        )}
        {(type === "all" || type === "noodle") && (
          <SectionPart
            type={type}
            message="Mỳ cay của Top One"
            subType={subType}
            data={noodles}
          />
        )}
        {(type === "all" || type === "food") && (
          <SectionPart
            type={type}
            message="Cơm của Top One"
            subType={subType}
            data={foods}
          />
        )}
      </h1>
    </div>
  );
};

function SectionPart({
  type,
  data,
  subType,
  message: title,
}: MenuItemListProps) {
  let message = "";
  if (type === "drink") {
    switch (subType) {
      case "tea":
        message = "Trà trái cây của Top One";
        break;
      case "yogurt":
        message = "Sữa chua của Top One";
        break;
      case "juice":
        message = "Nước ép, đá xay của Top One";
        break;
      case "milk-tea":
        message = "Trà sữa của Top One";
        break;
      case "other":
        message = "Các thức uống khác của Top One";
        break;
      default:
        message = "Cà phê, trà sữa của Top One";
    }
  } else if (type === "noodle") {
    message = "Mỳ cay của Top One";
  } else if (type === "food") {
    message = "Cơm của Top One";
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {type !== "all" && <h1>{message}</h1>}
        {type === "all" && <h1 className="text-red-300">{title}</h1>}
        <div className="grid grid-cols-3 gap-5">
          {!subType && data.map((item) => <MenuItem data={item} />)}
          {subType &&
            data
              .filter((item) => item.sub_type === type + "_" + subType)
              .map((item) => <MenuItem data={item} />)}
          {subType === "all" && data.map((item) => <MenuItem data={item} />)}
        </div>
      </div>
    </div>
  );
}

export default MenuItemList;
