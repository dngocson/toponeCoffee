import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { deleteMenuItem } from "../../services/apiMenu";
export function useDeleteSetting() {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteMenuItem(id),
    onSuccess: () => {
      toast.success("Xóa Thành công");
      queryClient.invalidateQueries({
        queryKey: ["menu"],
      });
    },
  });
  return { mutate, isDeleting };
}
