const { default: client } = require("./baseApi");

const productURL = "products";
const productSearchURL = "products/search";
const allCategoriesURL = "products/categories";

export async function GetAllProduct({ keyword, limit, skip }) {
  return await client.get(
    productSearchURL + "?q=" + keyword + "&limit=" + limit + "&skip=" + skip
  );
}
export async function GetSelectProduct({ select, limit }) {
  return await client.get(productURL + "?select=" + select + "&limit=" + limit);
}
export async function GetAllCategories() {
  return await client.get(allCategoriesURL);
}
