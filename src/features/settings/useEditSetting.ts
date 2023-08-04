import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMenuItem } from "../../services/apiMenu";
import { MenuItemProps } from "../../ui/type";
import { toast } from "react-hot-toast";
export function useEditSetting() {
  const queryClient = useQueryClient();
  const { mutate: editSetting, isLoading: isEditing } = useMutation({
    mutationFn: ({
      newItem,
      id,
    }: {
      newItem: MenuItemProps;
      id: number | undefined;
    }) => createMenuItem(newItem, id),
    onSuccess: () => {
      toast.success("Sửa thành công");
      queryClient.invalidateQueries({
        queryKey: ["menu"],
      });
    },

    onError: (err: any) => toast.error(err.message),
  });
  return { editSetting, isEditing };
}
