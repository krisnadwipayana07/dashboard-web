import client from "./baseApi";

const userDetailAPI = "users/";

export async function GetUserDetail(id) {
  return await client.get(userDetailAPI + id);
}
