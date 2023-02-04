const imageValidate = (images) => {
  let imageTable = [];
  if (Array.isArray(images)) {
    //Overwrite imageTable for multiple images
    imageTable = images;
  } else {
    imageTable.push(images);
  }

  if (imageTable.length > 3) {
    return { error: "Only sent 3 images at once" };
  }
  for (let image of imageTable) {
    if (image.size > 1048576) {
      return { error: "Size Too Large (Above 1 MB)" };
    }

    const fileTypes = /jpg|jpeg|png/;
    //console.log("1", image);
    const mimeTypes = fileTypes.test(image.mimetype);
    //console.log("2", mimeTypes);
    if (!mimeTypes) {
      return { error: "Incorrect Mine Type, (should be JPG , JPEG or PNG)" };
    }
  }
  return { error: false };
};

module.exports = imageValidate;
