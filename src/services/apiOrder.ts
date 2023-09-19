import { getToday } from "../helper/helperFunctions";
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
    .select("*")
    .eq("order_id", orderData.id);
  if (orderedItemsError) {
    console.error(orderedItemsError);
    throw new Error("Không thể lấy dữ liệu từ server");
  }

  return { orderData, orderedItemsData };
}

export async function getAllOrder({
  page,
  sortBy,
  filter,
  phoneNumber,
}: {
  page: number;
  sortBy: { field: string; direction: string };
  filter?: { field: string; value: string };
  phoneNumber: string | null;
}) {
  let query;
  if (phoneNumber === null) {
    query = supabase.from("orders").select("*", { count: "exact" });
  } else {
    query = supabase
      .from("orders")
      .select("*", { count: "exact" })
      .eq("phoneNumber", phoneNumber);
  }
  // If have Pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  // If have Sort
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }
  // If have filter
  if (filter != null) query = query.eq(filter.field, filter.value);
  //

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
    quantity: item.quantity,
    price: item.unitPrice,
    order_id: data[0].id,
    name: item.name,
    ice_level: item.iceLevel,
    sugar_level: item.suggarLevel,
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
  await fetch("https://rencklphdevxcyjmpobp.supabase.co/functions/v1/resend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors",
  });

  return { data, orderedItemError };
}

export async function updateOrderById({
  id,
  value,
}: {
  id: number;
  value: string;
}) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: value })
    .eq("id", id)
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("Không thể lấy dữ liệu từ server");
  }
  return { data, error };
}

export async function getOrderAfterDay(date: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("created_at,status,totalPrice,drinkPrice,noodlePrice,foodPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Không thể lấy dữ liệu từ server");
  }

  return data;
}

export async function getTodayOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .gte("created_at", getToday())
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Không thể lấy dữ liệu từ server");
  }
  return data;
}
