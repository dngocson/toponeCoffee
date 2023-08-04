import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMenuItem } from "../../services/apiMenu";
import { MenuItemProps } from "../../ui/type";
import { toast } from "react-hot-toast";
export function useCreateSetting() {
  const queryClient = useQueryClient();
  const { mutate: addItem, isLoading: isCreating } = useMutation({
    mutationFn: (newItem: MenuItemProps) => createMenuItem(newItem),
    onSuccess: () => {
      toast.success("Thêm thành công");
      queryClient.invalidateQueries({
        queryKey: ["menu"],
      });
    },
  });
  return { addItem, isCreating };
}
