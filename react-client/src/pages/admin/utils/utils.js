import axios from "axios";

//Upload Image and store in db
export const uploadImageApiRequest = async (images, productId) => {
  const formData = new FormData();

  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });

  const { data } = await axios.post(
    "/api/products/admin/upload?productId=" + productId,
    formData
  );
  return data;
};

//To Upload Images directly to cloudinary
//Doc Link :- https://cloudinary.com/documentation/upload_images
export const uploadImagesCloudinaryApiRequest = (images, productId) => {
  const cloudinaryURL =
    "https://api.cloudinary.com/v1_1/djiazwfyp/image/upload";
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    let file = images[i];
    formData.append("file", file);
    formData.append("upload_preset", "ktorbhgs");
    fetch(cloudinaryURL, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Cloud res", data);
        //Upload images url in db
        axios.post(
          "/api/products/admin/upload?cloudinary=true&productId=" + productId,
          data
        );
      });
  }
};
