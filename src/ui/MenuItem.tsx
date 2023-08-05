import { MenuItemProps } from "./type";

function MenuItem({ data }: { data: MenuItemProps }) {
  const promotion =
    data.promotion === "best seller" || data.promotion === "new";
  return (
    <div className="relative flex flex-col gap-2 overflow-hidden rounded-xl ">
      {promotion && (
        <p className="absolute left-[-56px] top-[21px] z-10 min-w-[200px] rotate-[-37deg] whitespace-nowrap bg-[#f00] px-[3rem] py-[0.2rem] text-center text-sm font-semibold uppercase text-white shadow-cardShadow2">
          {data.promotion}
        </p>
      )}
      <div className="h-[270px] w-[270px] overflow-hidden rounded-xl transition-all duration-300">
        <img
          className="h-[270px] w-[270px] rounded-xl shadow-cardShadow transition-all duration-300 hover:scale-110"
          src={data.image}
        />
      </div>
      <p className="font-bold uppercase">{data.name}</p>
      <p>{data.price}đ</p>
    </div>
  );
}

export default MenuItem;
