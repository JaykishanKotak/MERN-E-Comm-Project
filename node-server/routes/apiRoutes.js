const express = require("express");
const app = express();
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const jwt = require("jsonwebtoken");

//Logout and clear cookies
app.get("/logout", (req, res) => {
  try {
    //Destory Cookie from web browser
    return res.clearCookie("access_token").send("access token cleared");
  } catch (error) {
    console.log(error);
  }
});
//To get access token
app.get("/get-token", (req, res) => {
  try {
    const accessToken = req.cookies["access_token"];
    //console.log("access", accessToken);
    //console.log("key", process.env.JWT_SECRET_KEY);
    let decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    //console.log("decode", decoded);
    return res.json({ token: decoded.firstName, isAdmin: decoded.isAdmin });
    //console.log("res", res);
  } catch (error) {
    //console.log("error", error);
    return res.status(401).send("Unauthorized. Invalid Token");
  }
});
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
module.exports = app;
