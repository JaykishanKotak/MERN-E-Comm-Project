require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected To MongoDB!");
  } catch (error) {
    console.log(error, "Connection Faild");
    process.exit(1);
    // exit code 1 means somting wrong 0 means success
  }
};

module.exports = connectDB;
