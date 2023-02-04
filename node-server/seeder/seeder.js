const connectDB = require("../config/db");
connectDB();

const categoryData = require("./category");
const Category = require("../models/CategoryModel");

const productData = require("./product");
const Product = require("../models/ProductModel");

const reviewData = require("./reviews");
const Review = require("../models/ReviewModel");

const userData = require("./users");
const User = require("../models/UserModel");

const orderData = require("./orders");
const Order = require("../models/OrderModel");
//console.log(process.argv);
const importData = async () => {
  try {
    await Category.collection.dropIndexes();
    await Product.collection.dropIndexes();
    await Review.collection.dropIndexes();
    await User.collection.dropIndexes();
    await Order.collection.dropIndexes();

    await Category.collection.deleteMany({});
    await Product.collection.deleteMany({});
    await Review.collection.deleteMany({});
    await User.collection.deleteMany({});
    await Order.collection.deleteMany({});

    // If seeder request is not for delete
    if (process.argv[2] !== "-d") {
      await Category.insertMany(categoryData);
      //await Product.insertMany(productData);
      //await Review.insertMany(reviewData);

      //Mapping reviews collection with Product collection
      const reviews = await Review.insertMany(reviewData);
      const sampleProducts = productData.map((product) => {
        reviews.map((review) => {
          product.reviews.push(review._id);
        });
        // return js object to array with spread operator
        return { ...product };
      });
      await Product.insertMany(sampleProducts);
      await User.insertMany(userData);
      await Order.insertMany(orderData);
      //console.log("Seeder data added Successfully");
      console.log("Seeder data imported Successfully");
      process.exit();
    }
    console.log("Seeder data deleted Successfully");
    process.exit();
  } catch (error) {
    console.log("Error while adding seeder data", error);
    process.exit(1);
  }
};

//To add seeders into the npm run seed:data
//To delete seeders from the DB npm run seed:data-d
setTimeout(() => {
  importData();
}, 1000);
