import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllOrder } from "../../services/apiOrder";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../ui/Pagination";

export function useGetAllOrder() {
  const queryClient = useQueryClient();
  // Pagination
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: allOrder = { count: 0, allOrderData: [] },
    error,
  } = useQuery({
    queryKey: ["order", page],
    queryFn: () => getAllOrder({ page }),
  });

  const pageCount = Math.ceil((allOrder.count ?? 0) / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["order", page + 1],
      queryFn: () => getAllOrder({ page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["order", page - 1],
      queryFn: () => getAllOrder({ page: page - 1 }),
    });
  }
  //
  return { isLoading, allOrder, error };
}
