import { MenuItemProps } from "../ui/type";
import supabase, { supabaseUrl } from "./supabase";

export async function getMenu() {
  const { data, error } = await supabase.from("menu").select("*");
  if (error) {
    console.error(error);
    throw new Error("Khong the lay du lieu tu sever");
  }
  return { data, error };
}

export async function createMenuItem(newItem: MenuItemProps) {
  console.log(newItem);
  const imageName = `${Math.random()}-${newItem.image.name}`.replace("/", "");
  //https://rencklphdevxcyjmpobp.supabase.co/storage/v1/object/public/menu/Acer_Wallpaper_01_5000x2814.jpg
  const imagePath = `${supabaseUrl}/storage/v1/object/public/menu/${imageName}`;
  const { data, error } = await supabase
    .from("menu")
    .insert([{ ...newItem, image: imagePath }]);
  if (error) {
    console.error(error);
    throw new Error("Khong the upload du lieu len sever");
  }
  // Upload Image

  const { error: storageError } = await supabase.storage
    .from("menu")
    .upload(imageName, newItem.image);
  if (storageError) {
    console.error(storageError);
    throw new Error("Khong the upload du lieu len sever");
  }
  return { data };
}

export async function deleteMenuItem(id: number) {
  const { data, error } = await supabase.from("menu").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Xóa thất bại ");
  }
  return { data };
}
