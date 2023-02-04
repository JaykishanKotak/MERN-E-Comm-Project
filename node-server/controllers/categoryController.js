const Category = require("../models/CategoryModel");

const getCategories = async (req, res, next) => {
  try {
    //res.send("Handling category routes, e.g. search for category");
    //orFail sents error message on fail condition or model is undefined
    const categories = await Category.find({}).sort({ name: "asc" }).orFail();
    res.json(categories);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const newCategory = async (req, res, next) => {
  try {
    // how to check bool data of any request
    // first ! turns the req.body into bool and second ! truns false to true
    //res.send(!!req.body);
    //destrucring req.body
    const { category } = req.body;
    if (!category) {
      //throw new Error("Category is required");
      res.status(400).send("Category input is required");
    }
    const categoryExists = await Category.findOne({ name: category });
    if (categoryExists) {
      res.status(400).send("Category already Exists");
    } else {
      const categoryCreated = await Category.create({ name: category });
      res.status(201).send({ categoryCreated: categoryCreated });
    }
    res.send(category);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  // Return dynamic part of Url
  //return res.send(req.params.category);
  try {
    if (req.params.category !== "Choose category") {
      //decode uri component decodes the path of Uri
      const categoryExists = await Category.findOne({
        name: decodeURIComponent(req.params.category),
      }).orFail();
      await categoryExists.remove();
      res.json({ categoryDeleted: true });
    }
  } catch (error) {
    next(error);
  }
};

const saveAttr = async (req, res, next) => {
  const { key, val, categoryChoosen } = req.body;
  if (!key || !val || !categoryChoosen) {
    return res.status(400).send("All inputs are required");
  }
  try {
    // select onlt main part of category
    const category = categoryChoosen.split("/")[0];
    const categoryExists = await Category.findOne({ name: category }).orFail();
    if (categoryExists.attrs.length > 0) {
      // if key exists in db add attrs into it
      var keyDoesNotExistsInDatabase = true;
      categoryExists.attrs.map((item, idx) => {
        if (item.key === key) {
          keyDoesNotExistsInDatabase = false;
          //see attrs in category seeders to get more info
          // this stap is done to add new values in attrs
          var copyAttributesValues = [...categoryExists.attrs[idx].value];
          copyAttributesValues.push(val);
          //Set Ensures that only unique values will enter
          var newAttributesValues = [...new Set(copyAttributesValues)];
          //Overwrite old values with new one
          categoryExists.attrs[idx].value = newAttributesValues;
        }
      });
      if (keyDoesNotExistsInDatabase) {
        categoryExists.attrs.push({ key: key, value: [val] });
      }
    } else {
      // push new object to the attrs array
      // we can add multiple value in a single attr
      categoryExists.attrs.push({ key: key, value: [val] });
    }
    await categoryExists.save();
    let cat = await Category.find({}).sort({ name: "asc" });
    return res.status(201).json({ categoriesUpdated: cat });
  } catch (error) {
    next(error);
  }
};
module.exports = { getCategories, newCategory, deleteCategory, saveAttr };
