import supabase from "./supabase";

export async function getMenu() {
  let query = supabase.from("menu").select("*");
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Khong the lay du lieu tu sever");
  }
  return { data, error };
}
