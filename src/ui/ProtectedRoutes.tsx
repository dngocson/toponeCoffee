import { ReactNode, useEffect } from "react";
import supabase from "../services/supabase";
import { useUser } from "../features/user/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading],
  );
  if (isLoading) return <Spinner />;
  if (isAuthenticated) return children;
};

export default ProtectedRoutes;

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}
