import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../services/apiUser";
import { useNavigate } from "react-router-dom";
import { UserProps } from "./type";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: (data: UserProps) => loginUser(data),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.data.user);
      toast.success("login sucess");
      navigate("/admin");
    },
    onError: () => {
      toast.error("Mật khẩu hoặc email sai");
    },
  });
  return { login, isLoading };
}
