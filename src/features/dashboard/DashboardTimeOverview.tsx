import { ReactElement } from "react";
import { cn } from "../../helper/utils";
import { formatCurrencyNumber } from "../../helper/helperFunctions";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { BiFoodMenu } from "react-icons/bi";
type DashboardTimeOverviewProps = {
  orders: { created_at: any; status: any; totalPrice: number }[];
  numDays: number;
};
export default function DashboardTimeOverview({
  orders,
  numDays,
}: DashboardTimeOverviewProps) {
  const numOrders = orders.length;
  const totalOrderValue = orders.reduce(
    (accumulator, currentValue) => accumulator + currentValue.totalPrice,
    0,
  );
  const averagePerday = Math.round(totalOrderValue / numDays / 1000) * 1000;
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 md:mt-8 lg:grid-cols-4">
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
      <Stats
        title={"Số đơn"}
        borderColor={`border-[#d97706]`}
        iconColor={`text-[#d97706]`}
        iconBackgroundColor={`bg-[#fef3c7]`}
        value={`${(numOrders / numDays).toFixed(2).toString()}/ngày`}
        icon={<BiFoodMenu />}
      />
      <Stats
        title={"tổng đơn"}
        borderColor={`border-[#db2777]`}
        iconColor={`text-[#db2777]`}
        iconBackgroundColor={`bg-[#fce7f3]`}
        value={`${formatCurrencyNumber(averagePerday.toString())}/ngày`}
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
        `flex gap-2 rounded-2xl border-2 px-2 py-2   md:gap-4 md:py-4`,
        borderColor,
      )}
    >
      <div
        className={`my-auto text-2xl mediumPhone:text-3xl largePhone:text-4xl sm:text-5xl`}
      >
        <span
          className={cn(
            `block rounded-full bg-red-200 p-2 text-black`,
            iconColor,
            iconBackgroundColor,
          )}
        >
          {icon}
        </span>
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-xs uppercase mediumPhone:text-sm largePhone:text-base sm:text-lg">
          {title}
        </h3>
        <h3 className="text-xs font-semibold mediumPhone:text-sm largePhone:text-base sm:text-lg">
          {value}
        </h3>
      </div>
    </div>
  );
}
