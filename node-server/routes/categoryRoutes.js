const express = require("express");
const router = express.Router();
const {
  getCategories,
  newCategory,
  deleteCategory,
  saveAttr,
} = require("../controllers/categoryController");

const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");
//router.get("/", (req, res) => {
//res.send("Handling this route for products....");
//});

//================ User Routes ================
router.get("/", getCategories);

//================ Admin Routes ================
router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.post("/", newCategory);
router.delete("/:category", deleteCategory);
router.post("/attr", saveAttr);

module.exports = router;
