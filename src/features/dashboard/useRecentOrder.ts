import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getOrderAfterDay } from "../../services/apiOrder";

export function useRecentOrder() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();
  const {
    isLoading,
    data: orders,
    error,
  } = useQuery({
    queryFn: () => getOrderAfterDay(queryDate),
    staleTime: 0,
    queryKey: ["orders", `last-${numDays}`],
  });
  const completedOrder = orders?.filter(
    (order) => order.status === "completed" || order.status === "confirmed",
  );
  return { isLoading, completedOrder, error, numDays };
}
