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

export async function deleteMenuItem(id: number) {
  const { data, error } = await supabase.from("menu").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}

export async function createMenuItem(newItem: MenuItemProps, id?: number) {
  const hasImagePath = newItem.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newItem.image.name}`.replace("/", "");
  //https://rencklphdevxcyjmpobp.supabase.co/storage/v1/object/public/menu/Acer_Wallpaper_01_5000x2814.jpg
  const imagePath = hasImagePath
    ? newItem.image
    : `${supabaseUrl}/storage/v1/object/public/menu/${imageName}`;

  let query;

  // Create
  // if (!id) {
  //   query = await supabase
  //     .from("menu")
  //     .insert([{ ...newItem, image: imagePath }]);
  // } else {
  //   query = await supabase
  //     .from("menu")
  //     .update({ ...newItem, image: imagePath })
  //     .eq("id", id)
  //     .select();
  // }

  if (!id) {
    query = supabase.from("menu").insert([{ ...newItem, image: imagePath }]);
  }

  // B.Edit
  else
    query = supabase
      .from("menu")
      .update({ ...newItem, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().returns<MenuItemProps>();
  if (error) {
    console.error(error);
    throw new Error("menu could not be created");
  }

  ////////////UPLOAD image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("menu")
    .upload(imageName, newItem.image);

  ///////// Delete menu if any error
  if (storageError) {
    await supabase.from("menu").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("menu could not be created");
  }

  return data;
}
