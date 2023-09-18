import { eachDayOfInterval, subDays, format, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardSalesTimechart({ orders, numDays }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const startDate = allDates.at(0);
  const endDate = allDates.at(-1);
  const data = allDates.map((date) => {
    return {
      label: format(date, "dd MMM ", {
        locale: vi,
      }),
      totalSales: orders
        .filter((order: any) => isSameDay(date, new Date(order.created_at)))
        .reduce((acc: any, cur: any) => acc + cur.totalPrice, 0),
    };
  });
  return (
    <div className="w-full">
      {startDate !== undefined && endDate !== undefined && (
        <h2 className="text-xl font-bold">
          Đơn hàng từ{" "}
          {format(startDate, "dd MMM  yyyy", {
            locale: vi,
          })}{" "}
          &mdash;{" "}
          {format(endDate, "dd MMM  yyyy", {
            locale: vi,
          })}
        </h2>
      )}
      <ResponsiveContainer height={300} width={"100%"}>
        <AreaChart data={data}>
          <XAxis
            dataKey={"label"}
            tick={{ fill: "#374151" }}
            tickLine={{ stroke: "#374151" }}
          />
          <YAxis
            width={100}
            unit={"vnđ"}
            tick={{ fill: "#374151" }}
            tickLine={{ stroke: "#374151" }}
          />
          <CartesianGrid strokeDasharray={4} />
          <Tooltip contentStyle={{ backgroundColor: "#fff" }} />
          <Area
            dataKey={"totalSales"}
            type={"monotone"}
            stroke="#4f46e5"
            fill="#c7d2fe"
            strokeWidth={2}
            name="Tổng cộng"
            unit="vnđ"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
