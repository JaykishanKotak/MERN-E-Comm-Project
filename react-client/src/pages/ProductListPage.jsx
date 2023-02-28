import React from "react";
import ProductListPageComponent from "./components/ProductListPageComponent";
import axios from "axios";
import { useSelector } from "react-redux";

let filtersUrl = "";

const proceedFilters = (filters) => {
  filtersUrl = "";
  //Convert into array and map
  Object.keys(filters).map((key, index) => {
    if (key === "price") {
      filtersUrl += `&price=${filters[key]}`;
    } else if (key === "rating") {
      let rat = "";
      Object.keys(filters[key]).map((key2, index2) => {
        //Get comma seprated values of rating
        if (filters[key][key2]) {
          rat += `${key2}`;
          return "";
        }
      });
      filtersUrl += "&rating=" + rat;
    } else if (key === "category") {
      let cat = "";
      Object.keys(filters[key]).map((key3, index3) => {
        //Get comma seprated values of category
        if (filters[key][key3]) {
          cat += `${key3}`;
          return "";
        }
      });
      filtersUrl += "&category=" + cat;
    } else if (key === "attrs") {
      if (filters[key].length > 0) {
        let val = filters[key].reduce((acc, item) => {
          let key = item.key;
          //Join data of array by "-"
          let val = item.value.join("-");
          //EX attrs=color-red-blue,size-1TB-2TB
          return acc + key + "-" + val + ",";
        }, "");
        filtersUrl += "&attrs=" + val;
      }
    }
    return "";
  });
  return filtersUrl;
};
const getProducts = async (
  categoryName = "",
  pageNumParam = null,
  searchQuery = "",
  filters = {},
  sortOption = ""
) => {
  //   filtersUrl = "&price=60&rating=1,2,3&category=a,b,c,d&attrs=color-red-blue,size-1TB-2TB";
  filtersUrl = proceedFilters(filters);
  //console.log(filters);
  //Full path of a endpoint with all filters
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const category = categoryName ? `category/${categoryName}` : "";
  const url = `/api/products/${category}${search}?pageNum=${pageNumParam}${filtersUrl}&sort=${sortOption}`;
  //const { data } = await axios.get("/api/products");
  const { data } = await axios.get(url);
  //Data is list of products
  return data;
};
const ProductListPage = () => {
  //For show specific attributes
  const { categories } = useSelector((state) => state.getCategories);

  //axios.get("/api/products").then((res) => console.log(res));
  return (
    <ProductListPageComponent
      getProducts={getProducts}
      categories={categories}
    />
  );
};

export default ProductListPage;
