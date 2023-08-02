import supabase from "./supabase";

export async function getMenu() {
  const { data, error } = await supabase.from("menu").select("*");
  if (error) {
    console.error(error);
    throw new Error("Khong the lay du lieu tu sever");
  }
  return { data, error };
}
