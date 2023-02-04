const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getBestSellers,
  adminGetProducts,
  adminDeleteProducts,
  adminCreateProducts,
  adminUpdateProducts,
  adminUpload,
  adminDeleteProductImage,
} = require("../controllers/productController");

const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");
//router.get("/", (req, res) => {
//res.send("Handling this route for products....");
//});

//================ User Routes ================
//Search through perticler category
router.get("/category/:categoryName/search/:searchQuery", getProducts);
router.get("/category/:categoryName", getProducts);
//Search Through all of category
router.get("/search/:searchQuery", getProducts);
router.get("/", getProducts);
router.get("/bestsellers", getBestSellers);
router.get("/get-one/:id", getProductById);

//================ Admin Routes ================
router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.get("/admin", adminGetProducts);
router.delete("/admin/:id", adminDeleteProducts);
router.put("/admin/:id", adminUpdateProducts);
router.post("/admin", adminCreateProducts);
router.post("/admin/upload", adminUpload);
//image path to remove physically image, productId to remove image from product
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage);
module.exports = router;
