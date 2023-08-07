import { useSearchParams } from "react-router-dom";
export function useGetType(str: string) {
  const [searchParams] = useSearchParams();
  const currentFilter = searchParams.get(str);
  const [type, subType] = currentFilter?.split("_") || ["all", ""];
  return [type, subType];
}
