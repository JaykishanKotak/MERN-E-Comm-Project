const express = require("express");
const router = express.Router();
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");
const {
  getUserOrders,
  getOrder,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getOrderForAnalysis,
} = require("../controllers/orderController");

//router.get("/", (req, res) => {
//res.send("Handling this route for products....");
//});
//================ User Routes ================
router.use(verifyIsLoggedIn);
router.get("/", getUserOrders);
//Get order of currently loggedin user
router.get("/user/:id", getOrder);
router.post("/", createOrder);
//Check if user paid for order
router.put("/paid/:id", updateOrderToPaid);

//================ Admin Routes ================
router.use(verifyIsAdmin);
router.put("/delivered/:id", updateOrderToDelivered);
router.get("/admin", getOrders);
router.get("/analysis/:date", getOrderForAnalysis);

module.exports = router;
