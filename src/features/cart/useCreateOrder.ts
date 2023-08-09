import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditOrder } from "../../services/apiOrder";
export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { mutate: createOrder, isLoading: isCreating } = useMutation({
    mutationFn: (newOrder: any) => createEditOrder(newOrder),
    onSuccess: (data) => {
      toast.success("Đặt hàng thành công");
      queryClient.invalidateQueries({
        queryKey: ["order", data.data[0].name],
      });
    },
  });
  return { createOrder, isCreating };
}
