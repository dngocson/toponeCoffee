import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/apiUser";
import { useNavigate } from "react-router-dom";
import { UserProps } from "./type";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: (data: UserProps) => loginUser(data),
    onSuccess: (user) => {
      console.log(user);
      navigate("/admin");
    },
  });
  return { login, isLoading };
}
