import { useQuery } from "@tanstack/react-query";
import { getTodayOrders } from "../../services/apiOrder";
export function useGetTodayOrdes() {
  const {
    isLoading,
    data: orders,
    error,
  } = useQuery({
    queryFn: () => getTodayOrders(),
    staleTime: 0,
    queryKey: ["orders-today"],
  });

  return { isLoading, orders, error };
}
