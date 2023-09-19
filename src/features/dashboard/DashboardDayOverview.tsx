import supabase from "../../services/supabase";
import { format } from "date-fns";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useGetTodayOrdes } from "./useGetTodayOrdes";
import Spinner from "../../ui/Spinner";
import {
  convertOrderStatus,
  formatCurrencyNumber,
} from "../../helper/helperFunctions";
import { vi } from "date-fns/locale";
import { Link } from "react-router-dom";
import { cn } from "../../helper/utils";
export default function DashboardDayOverview() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const orders = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          console.log("Change received!", payload);
          queryClient.invalidateQueries({
            queryKey: ["order"],
          });
          toast.loading((t) => (
            <div className="flex flex-col gap-4 text-green-600">
              Có một đơn hàng mới
              <button
                className="rounded-md bg-blue-500 p-2 text-white"
                onClick={() => toast.dismiss(t.id)}
              >
                Xác nhận
              </button>
            </div>
          ));
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(orders);
    };
  }, []);
  const { isLoading, orders } = useGetTodayOrdes();
  if (isLoading) return <Spinner />;
  console.log(orders);
  return (
    <div className="col-span-2 border-2 border-blue-600 ">
      <h2 className="m-5  text-xl font-bold">Hôm nay</h2>
      <div className="mb-2 grid grid-cols-4 justify-items-center px-2 font-bold uppercase">
        <h3>Thời gian</h3>
        <h3>Tổng đơn</h3>
        <h3>Trạng thái</h3>
        <h3>Cập nhật</h3>
      </div>
      <div className="relative max-h-[80%] overflow-y-auto overflow-x-hidden">
        <div className="px-2">
          {orders &&
            orders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-4 justify-items-center border-t border-blue-600  uppercase"
              >
                <p
                  className={cn("text-black", {
                    "text-red-600": order.status === "pending",
                    "text-gray-600": order.status === "completed",
                    "text-green-600": order.status === "confirmed",
                  })}
                >
                  {format(new Date(order.created_at), "p", {
                    locale: vi,
                  })}
                </p>
                <p
                  className={cn("text-black", {
                    "text-red-600": order.status === "pending",
                    "text-gray-600": order.status === "completed",
                    "text-green-600": order.status === "confirmed",
                  })}
                >
                  {formatCurrencyNumber(order.totalPrice.toString())}
                </p>
                <p
                  className={cn("text-black", {
                    " text-red-600": order.status === "pending",
                    "text-gray-600": order.status === "completed",
                    "text-green-600": order.status === "confirmed",
                  })}
                >
                  {convertOrderStatus(order.status)}
                </p>
                <Link
                  className={cn("text-black", {
                    " text-red-600": order.status === "pending",
                    "text-gray-600": order.status === "completed",
                    "text-green-600": order.status === "confirmed",
                  })}
                  to={`/order/${order.name}`}
                >
                  Cập nhật
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
