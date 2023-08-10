import { useQuery } from "@tanstack/react-query";
import { getOrderByName } from "../../services/apiOrder";

export function useGetOrderByName(name: string) {
  const {
    isLoading,
    data: order,
    error,
  } = useQuery({
    queryKey: ["order", name],
    queryFn: () => getOrderByName(name),
  });
  return { isLoading, order, error };
}
