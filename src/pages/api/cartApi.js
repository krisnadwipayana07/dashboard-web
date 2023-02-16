import client from "./baseApi";

const AllCartAPI = "carts";
const CartDetailAPI = "carts/";

export async function GetAllCart({ limit, skip }) {
  return await client.get(AllCartAPI + "?skip=" + skip + "&limit=" + limit);
}
export async function GetCartDetail({ id }) {
  return await client.get(CartDetailAPI + id);
}
