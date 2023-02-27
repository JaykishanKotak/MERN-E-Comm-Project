import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import EditProductPageComponent from "./components/EditProductPageComponent";
import { useDispatch } from "react-redux";
import { saveAttrToCategoryDocument } from "../../redux/actions/categoryActions";
import {
  uploadImageApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "./utils/utils";
//Get product details
const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`);
  return data;
};

//Update product items
const updateProductApiRequest = async (productId, formInputs) => {
  const { data } = await axios.put(`/api/products/admin/${productId}`, {
    ...formInputs,
  });
  return data;
  // console.log(productId);
  // console.log(formInputs);
};

//For single/multiple imahe uploads
// const uploadHandler = async (images, productId) => {
//   //Built in class to handle form datas
//   const formData = new FormData();

//   Array.from(images).forEach((image) => {
//     formData.append("images", image);
//   });
//   await axios.post(
//     "/api/products/admin/upload?productId=" + productId,
//     formData
//   );
// };
const AdminEditProductPage = () => {
  //Read category data from redux state
  const { categories } = useSelector((state) => state.getCategories);

  //Dispatch Category action
  const reduxDispatch = useDispatch();

  //For handle delete image
  const imageDeleteHandler = async (imagePath, productId) => {
    console.log("Before", imagePath);
    let encoded = encodeURIComponent(imagePath);
    console.log("After", encoded);
    if (process.env.NODE_ENV !== "production") {
      console.log("production");
      // TO DO : change to !==
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
    } else {
      console.log("Cloud");
      //For req of cloudinary service
      await axios.delete(
        `/api/products/admin/image/${encoded}/${productId}?cloudinary=true`
      );
    }
  };
  return (
    <EditProductPageComponent
      categories={categories}
      fetchProduct={fetchProduct}
      updateProductApiRequest={updateProductApiRequest}
      reduxDispatch={reduxDispatch}
      saveAttrToCategoryDocument={saveAttrToCategoryDocument}
      imageDeleteHandler={imageDeleteHandler}
      //uploadHandler={uploadHandler}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      uploadImageApiRequest={uploadImageApiRequest}
    />
  );
};

export default AdminEditProductPage;
