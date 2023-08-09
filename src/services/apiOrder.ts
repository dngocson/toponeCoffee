import supabase from "./supabase";

export async function createEditOrder(newOrder: any) {
  const orderData = newOrder.order;
  const cartData = newOrder.cart;

  const { data, error } = await supabase
    .from("orders")
    .insert([orderData])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Không thể tạo order");
  }
  // Upload Cart data
  const upLoadCartData = cartData.map((item: any) => ({
    item_id: item.id,
    quantity: item.quantity,
    order_id: data[0].id,
  }));
  const { error: orderedItemError } = await supabase
    .from("orderedItem")
    .insert(upLoadCartData)
    .select();
  if (orderedItemError) {
    await supabase.from("orders").delete().eq("id", data[0].id);
    console.error(orderedItemError);
    throw new Error("Không thể tạo order");
  }
  return { data, orderedItemError };
}
