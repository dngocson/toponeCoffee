import { MenuItemProps } from "./type";

function MenuItem({ data }: { data: MenuItemProps }) {
  return (
    <div className="flex flex-col gap-2">
      <img
        className="h-[270px] w-[270px] rounded-xl shadow-cardShadow"
        src={data.image}
      />
      <div>
        <p className="font-bold">{data.name}</p>
        <p>{data.price}đ</p>
      </div>
    </div>
  );
}

export default MenuItem;
