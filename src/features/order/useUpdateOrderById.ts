import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderById } from "../../services/apiOrder";
import { toast } from "react-hot-toast";
export function useUpdateOrderById() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, value }: { id: number; value: string }) =>
      updateOrderById({ id, value }),
    onSuccess: () => {
      toast.success("Cập nhật thành công");
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
    onError: (err: any) => toast.error(err.message),
  });
  return { mutate, isLoading };
}
