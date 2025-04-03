const url = "https://fakestoreapi.com/products";
const getData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
const getItem = async (id) => {
  const response = await fetch(`${url}/${id}`);
  const data = await response.json();
  return data;
}
const getCategories = async () => {
  const response = await fetch(`${url}/products/categories`);
  const data = await response.json();
  return data;
}
const getByCategory = async (category) => {
  const response = await fetch(`${url}/products/category/${category}`);
  const data = await response.json();
  return data;
}

module.exports = {
  getData,
  getItem,
  getCategories,
  getByCategory,
};