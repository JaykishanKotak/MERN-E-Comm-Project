const express = require("express");
const router = express.Router();
const {
  getUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");

//router.get("/", (req, res) => {
//res.send("Handling this route for products....");
//});
//================ User Routes ================
router.post("/register", registerUser);
router.post("/login", loginUser);

//================ Loggedin User Routes ================
router.use(verifyIsLoggedIn);
router.put("/profile", updateUserProfile);
router.get("/profile/:id", getUserProfile);
router.post("/review/:productId", writeReview);

//================ Admin Routes ================
router.use(verifyIsAdmin);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
module.exports = router;
