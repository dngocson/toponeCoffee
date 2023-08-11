import { PAGE_SIZE } from "../ui/Pagination";
import supabase from "./supabase";

export async function getOrderByName(name: string) {
  // Query the "orders" table to get data for the order with the given name
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("name", name)
    .single();
  if (orderError) {
    console.error(orderError);
    throw new Error("Không thể lấy dữ liệu từ server");
  }

  // Query the "orderedItem" table to get data for the items associated with the order
  const { data: orderedItemsData, error: orderedItemsError } = await supabase
    .from("orderedItem")
    .select("*,menu(name,price,image)")
    .eq("order_id", orderData.id);
  if (orderedItemsError) {
    console.error(orderedItemsError);
    throw new Error("Không thể lấy dữ liệu từ server");
  }

  return { orderData, orderedItemsData };
}

export async function getAllOrder({ page }: { page: number }) {
  let query = supabase.from("orders").select("*", { count: "exact" });
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data: allOrderData, error: allOrderError, count } = await query;
  if (allOrderError) {
    console.error(allOrderError);
    throw new Error("Không thể lấy dữ liệu từ server");
  }
  return { allOrderData, allOrderError, count };
}

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
    price: item.unitPrice,
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