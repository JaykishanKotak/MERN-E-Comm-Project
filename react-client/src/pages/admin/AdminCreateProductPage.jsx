import React from "react";
import CreateProductPageComponent from "./components/CreateProductPageComponent";
import axios from "axios";
import {
  uploadImageApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "./utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  newCategory,
  deleteCategory,
  saveAttrToCategoryDocument,
} from "../../redux/actions/categoryActions";
//Add form data to api to and store in db
const createProductApiRequest = async (formInputs) => {
  const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
  return data;
};

//Upload Image and store in db
// const uploadImageApiRequest = async (images, productId) => {
//   const formData = new FormData();

//   Array.from(images).forEach((image) => {
//     formData.append("images", image);
//   });

//   await axios.post(
//     "/api/products/admin/upload?productId=" + productId,
//     formData
//   );
// };

//To Upload Images directly to cloudinary
//Doc Link :- https://cloudinary.com/documentation/upload_images
// const uploadImagesCloudinaryApiRequest = (images, productId) => {
//   const cloudinaryURL =
//     "https://api.cloudinary.com/v1_1/djiazwfyp/image/upload";
//   const formData = new FormData();
//   for (let i = 0; i < images.length; i++) {
//     let file = images[i];
//     formData.append("file", file);
//     formData.append("upload_preset", "ktorbhgs");
//     fetch(cloudinaryURL, {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Cloud res", data);
//         //Upload images url in db
//         axios.post(
//           "/api/products/admin/upload?cloudinary=true&productId=" + productId,
//           data
//         );
//       });
//   }
// };

const AdminCreateProductPage = () => {
  //Call data from getCategories api in redux
  const { categories } = useSelector((state) => state.getCategories);
  const dispatch = useDispatch();
  return (
    <CreateProductPageComponent
      uploadImageApiRequest={uploadImageApiRequest}
      createProductApiRequest={createProductApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      categories={categories}
      reduxDispatch={dispatch}
      newCategory={newCategory}
      deleteCategory={deleteCategory}
      saveAttrToCategoryDocument={saveAttrToCategoryDocument}
    />
  );
};

export default AdminCreateProductPage;
