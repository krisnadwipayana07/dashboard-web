import client from "./baseApi";

const userDetailAPI = "users/";
const userLoginAPI = "auth/login";

export async function GetUserDetail(id) {
  return await client.get(userDetailAPI + id);
}

export async function LoginUser(data) {
  return await client.post(userLoginAPI, data);
}
