import { ReactElement } from "react";
import { cn } from "../../helper/utils";
import { formatCurrencyNumber } from "../../helper/helperFunctions";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { BiFoodMenu } from "react-icons/bi";
type DashboardTimeOverviewProps = {
  orders: { created_at: any; status: any; totalPrice: number }[];
};
export default function DashboardTimeOverview({
  orders,
}: DashboardTimeOverviewProps) {
  const numOrders = orders.length;
  const totalOrderValue = orders.reduce(
    (accumulator, currentValue) => accumulator + currentValue.totalPrice,
    0,
  );
  return (
    <div className="flex max-w-[50%] gap-10">
      <Stats
        title={"Số đơn"}
        borderColor={`border-blue-600`}
        iconColor={`text-blue-600`}
        iconBackgroundColor={`bg-blue-100`}
        value={numOrders.toString()}
        icon={<BiFoodMenu />}
      />
      <Stats
        title={"Tổng đơn"}
        borderColor={`border-green-600`}
        iconColor={`text-green-600`}
        iconBackgroundColor={`bg-green-100`}
        value={`${formatCurrencyNumber(totalOrderValue.toString())}`}
        icon={<HiOutlineBanknotes />}
      />
    </div>
  );
}

type StatsProps = {
  title: string;
  value: string;
  icon: ReactElement;
  borderColor: string;
  iconColor: string;
  iconBackgroundColor: string;
};
function Stats({
  title,
  value,
  icon,
  borderColor,
  iconColor,
  iconBackgroundColor,
}: StatsProps) {
  return (
    <div
      className={cn(
        `mt-12  flex gap-4 rounded-2xl border-2  px-10 py-4`,
        borderColor,
      )}
    >
      <div className={cn(`rounded-full  p-2 text-5xl`, iconBackgroundColor)}>
        <span className={cn(`text-black`, iconColor)}>{icon}</span>
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-lg  uppercase ">{title}</h3>
        <h3 className="text-lg font-semibold">{value}</h3>
      </div>
    </div>
  );
}
