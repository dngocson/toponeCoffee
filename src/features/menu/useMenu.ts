import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../../services/apiMenu";
export function useMenu() {
  const {
    isLoading,
    data: menuItem,
    error,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenu,
  });
  return { isLoading, menuItem, error };
}
