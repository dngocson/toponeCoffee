import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditOrder } from "../../services/apiOrder";
export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { mutate: createOrder, isLoading: isCreating } = useMutation({
    mutationFn: (newOrder: any) => createEditOrder(newOrder),
    onSuccess: () => {
      toast.success("Thêm thành công");
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
  });
  return { createOrder, isCreating };
}
