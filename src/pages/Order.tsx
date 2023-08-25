import AllOrderTable from "../features/order/AllOrderTable";
import supabase from "../services/supabase";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
function Order() {
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

  return (
    <div className="container min-h-screen">
      <AllOrderTable />
    </div>
  );
}

export default Order;
