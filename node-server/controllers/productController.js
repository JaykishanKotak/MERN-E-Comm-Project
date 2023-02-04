const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidate");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const getProducts = async (req, res, next) => {
  try {
    //Product.create({ name: "Console" });
    //res.send("Handling product routes, e.g. search for products");
    // 1 => asc order
    // -1 => desc order
    // Returns the number of current page
    const pageNum = Number(req.query.pageNum) || 1;
    //res.json({ pageNum });
    //Get total count of product in the DB
    //const totalProducts = await Product.countDocuments({});
    //res.json({ totalProducts });

    //Filtering
    let query = {};
    let = priceQueryCondition = {};
    let rateingQueryCondition = {};
    let queryCondition = false;

    if (req.query.price) {
      queryCondition = true;
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
    }
    if (req.query.rating) {
      queryCondition = true;
      rateingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
    }

    //Searching Product By Category Name
    let categoryQueryCondition = {};
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      queryCondition = true;
      let a = categoryName.replaceAll(",", "/");
      var regEx = new RegExp("^" + a);
      //replace / in category name with , to get valid path
      categoryQueryCondition = { category: regEx };
    }

    //Search by filter on products list
    if (req.query.category) {
      queryCondition = true;
      //get all category and sperate by , to get array of categories
      let a = req.query.category.split(",").map((item) => {
        if (item) {
          return new RegExp("^" + item);
        }
      });
      //overwrite value of categoryName
      categoryQueryCondition = { category: { $in: a } };
    }
    //Filter by attributes, attribucts may have multiple values so we use array this time
    let attrsQueryCondition = [];
    if (req.query.attrs) {
      //attrs : RAM-1TB-2TB-4TB,color-red-blue
      //first emeneat key followed by vlaue and seprate by , for different attributes
      //['RAM-1TB-2TB', 'color-red-blue', ''];
      attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          //Seprate the values by "-"
          let a = item.split("-");
          let values = [...a];
          //Remove First item / key
          values.shift();
          //key like query params and values like values
          let a1 = {
            attrs: {
              $elemMatch: {
                key: a[0],
                value: { $in: values },
              },
            },
          };
          acc.push(a1);
          //to see the value of objects in console
          console.dir(acc, { depth: null });
          return acc;
        } else {
          return acc;
        }
      }, []);
    }

    // dynamic sort by name , price, rating etc.
    let sort = {};
    const sortOptions = req.query.sort || "";
    if (sortOptions) {
      //seprate key and value request from request ex: price_1, "price", "1"
      let sortOpt = sortOptions.split("_");
      //dynamic key value pair
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
      console.log(sort);
    }

    //Searching by Products
    const searchQuery = req.params.searchQuery || "";
    let searchQueryCondition = {};
    let select = {};
    if (searchQuery) {
      queryCondition = true;
      searchQueryCondition = { $text: { $search: searchQuery } };
      console.log(searchQueryCondition);
      //Accyracy of search result
      select = {
        score: { $meta: "textScore" },
      };
      sort = { score: { $meta: "textScore" } };
    }

    //Combine Filter Results
    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          rateingQueryCondition,
          categoryQueryCondition,
          searchQueryCondition,
          ...attrsQueryCondition,
        ],
      };
    }
    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .select(select)
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsPerPage);
    res.json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("reviews")
      .orFail();
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const getBestSellers = async (req, res, next) => {
  try {
    const product = await Product.aggregate([
      {
        $sort: { category: 1, sales: -1 },
      },
      {
        $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } },
      },
      {
        $replaceWith: "$doc_with_max_sales",
      },
      {
        $match: {
          sales: { $gt: 0 },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          images: 1,
          category: 1,
          description: 1,
        },
      },
      {
        $limit: 3,
      },
    ]);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const adminGetProducts = async (req, res, next) => {
  try {
    const product = await Product.find({})
      .sort({ category: 1 })
      .select("name price category");
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const adminDeleteProducts = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    await product.remove();
    res.json({ message: "Product Removed" });
  } catch (error) {
    next(error);
  }
};

const adminCreateProducts = async (req, res, next) => {
  try {
    const product = new Product();
    const { name, description, count, price, category, attributesTable } =
      req.body;
    console.log(req.body);
    product.name = name;
    product.description = description;
    product.count = count;
    product.price = price;
    product.category = category;
    if (attributesTable.length > 0) {
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    }
    await product.save();
    res.json({ message: "Product Created", productId: product._id });
  } catch (error) {
    next(error);
  }
};

const adminUpdateProducts = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const { name, description, count, price, category, attributesTable } =
      req.body;
    console.log(req.body);
    product.name = name || product.name;
    product.description = description || product.description;
    product.count = count || product.count;
    product.price = price || product.price;
    product.category = category || product.category;
    if (attributesTable.length > 0) {
      product.attrs = [];
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    } else {
      product.attrs = [];
    }
    await product.save();
    res.json({ message: "Product Updated" });
  } catch (error) {
    next(error);
  }
};

const adminUpload = async (req, res, next) => {
  try {
    if (!req.files || !!req.files.images == false) {
      return res.status(400).send("No Files Found!!!");
    }
    //console.log(req.files);
    const validateResult = imageValidate(req.files.images);
    if (validateResult.error) {
      return res.status(400).send(validateResult.error);
    }
    console.log("1", req.query.productId);
    const product = await Product.findById(req.query.productId).orFail();
    const uploadDirectory = path.resolve(
      __dirname,
      "../../react-client",
      "public",
      "images",
      "products"
    );
    let imageTable = [];
    //Check Weather files are in array/multiple
    if (Array.isArray(req.files.images)) {
      //res.send("You Sent " + req.files.images.length + " images");
      imageTable = images;
    } else {
      //res.send("You send only one image");
      imageTable.push(req.files.images);
    }

    for (let image of imageTable) {
      //console.log("1", image);
      //console.log("2", path.extname(image.name));
      //console.log("3", uuidv4());
      var fileName = uuidv4() + path.extname(image.name);
      var uploadPath = uploadDirectory + "/" + fileName;
      product.images.push({ path: "/images/products" + fileName });
      //move file to directory
      image.mv(uploadPath, function (error) {
        if (error) {
          return res.status(500).send(error);
        }
      });
    }
    await product.save();
    return res.send("Files Uploded");
  } catch (error) {
    next(error);
  }
};
const adminDeleteProductImage = async (req, res, next) => {
  try {
    //catch and decode the path
    const imagePath = decodeURIComponent(req.params.imagePath);
    //ex to encode the path :-
    //console.log(encodeURIComponent('/images/productsad1cbd69-c2c7-4192-8e85-19a737d4a785.jpg'));

    const finalPath = path.resolve("../react-client/public") + imagePath;
    //console.log(finalPath);
    //remove image from DB
    fs.unlink(finalPath, (error) => {
      if (error) {
        res.status(500).send(error);
      }
    });
    //Pull image path from product which get by id
    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      {
        $pull: {
          images: {
            path: imagePath,
          },
        },
      }
    ).orFail();
    return res.end();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getProducts,
  getProductById,
  getBestSellers,
  adminGetProducts,
  adminDeleteProducts,
  adminCreateProducts,
  adminUpdateProducts,
  adminUpload,
  adminDeleteProductImage,
};
