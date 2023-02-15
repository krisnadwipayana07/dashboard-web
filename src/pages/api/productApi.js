const { default: client } = require("./baseApi");

const productURL = "products/search";

export async function GetAllProduct({ keyword, limit, skip }) {
  return await client.get(
    productURL + "?q=" + keyword + "&limit=" + limit + "&skip=" + skip
  );
}
