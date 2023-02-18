import React from "react";
import ProductListPageComponent from "./components/ProductListPageComponent";
import axios from "axios";

const getProducts = async () => {
  const { data } = await axios.get("/api/products");
  //Data is list of products
  return data;
};
const ProductListPage = () => {
  //axios.get("/api/products").then((res) => console.log(res));
  return <ProductListPageComponent getProducts={getProducts} />;
};

export default ProductListPage;
