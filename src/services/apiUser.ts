import { UserProps } from "../features/user/type";
import supabase from "./supabase";

export async function loginUser(userData: UserProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userData.email,
    password: userData.password,
  });
  if (error) throw new Error(error.message);
  console.log(data);
  return { data, error };
}
