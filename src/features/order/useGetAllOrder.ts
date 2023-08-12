import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllOrder } from "../../services/apiOrder";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../ui/Pagination";

export function useGetAllOrder() {
  const queryClient = useQueryClient();
  // Pagination
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // Sort
  const sortByURL = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByURL.split("-");
  const sortBy = { field, direction };

  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? undefined
      : { field: "status", value: filterValue };
  //
  const {
    isLoading,
    data: allOrder = { count: 0, allOrderData: [] },
    error,
  } = useQuery({
    queryKey: ["order", page, sortBy, filter],
    queryFn: () => getAllOrder({ page, sortBy, filter }),
  });

  const pageCount = Math.ceil((allOrder.count ?? 0) / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["order", page + 1, sortBy, filter],
      queryFn: () => getAllOrder({ page: page + 1, sortBy, filter }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["order", page - 1, sortBy, filter],
      queryFn: () => getAllOrder({ page: page - 1, sortBy, filter }),
    });
  }
  //
  return { isLoading, allOrder, error };
}
