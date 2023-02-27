const User = require("../models/UserModel");
const Review = require("../models/ReviewModel");
const Product = require("../models/ProductModel");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");

const getUsers = async (req, res, next) => {
  try {
    //res.send("Handling user routes e.g. get user details");
    const users = await User.find({}).select("-password").orFail();
    res.send({ users });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!(firstName && lastName && email && password)) {
      return res.status(400).send("All inputs are required");
    }

    //If user is already esixts
    const userExists = await User.findOne({ email });
    console.log("user", userExists);
    if (userExists) {
      //return res.status(400).json({ error: "User is alredy exists" });
      return res.status(400).send("user exists");
    } else {
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
      });
      //Return All fields expect Password
      //Add cookie for auth in browser
      res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.firstName,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          {
            httpOnly: true,
            //Comment out Secure when working with Postman for testing
            //secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          }
        )
        .status(201)
        .json({
          success: "User created",
          userCreated: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }
    const user = await User.findOne({ email }).orFail();
    if (user && comparePasswords(password, user.password)) {
      //compare password of user input and stored in db
      let cookieParams = {
        httpOnly: true,
        //Comment out Secure when working with Postman for testing
        //secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };

      //If doNotLogout is true
      if (doNotLogout) {
        //Overwrite the cookieParams with maxAge, for next 7 days user can login automiticaaly with passowrd or mail
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 };
        //1000 =~ 1ms
      }
      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.firstName,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          cookieParams
        )
        .json({
          success: "User logged in",
          userLoggedIn: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            doNotLogout,
          },
        });
    } else {
      return res.status(401).send("Wrong Credentials");
    }
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    //console.log("inusers", user);
    //console.log("body", req.body);
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    //user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    user.state = req.body.state;

    //Update Password
    if (req.body.password != user.password) {
      user.password = hashPassword(req.body.password);
    }
    await user.save();

    //Return Data
    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

//=============== Without Session ===============
const writeReview = async (req, res, next) => {
  try {
    // get comment, rating from request.body:
    const { comment, rating } = req.body;
    // validate request:
    if (!(comment && rating)) {
      return res.status(400).send("All inputs are required");
    }

    // create review id manually because it is needed also for saving in Product collection
    const ObjectId = require("mongodb").ObjectId;
    let reviewId = ObjectId();

    await Review.create([
      {
        _id: reviewId,
        comment: comment,
        rating: Number(rating),
        user: {
          _id: req.user._id,
          name: req.user.name + " " + req.user.lastName,
        },
      },
    ]);

    const product = await Product.findById(req.params.productId).populate(
      "reviews"
    );

    const alreadyReviewed = product.reviews.find(
      (r) => r.user._id.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).send("product already reviewed");
    }

    let prc = [...product.reviews];
    prc.push({ rating: rating });
    product.reviews.push(reviewId);
    if (product.reviews.length === 1) {
      product.rating = Number(rating);
      product.reviewsNumber = 1;
    } else {
      product.reviewsNumber = product.reviews.length;
      product.rating =
        prc
          .map((item) => Number(item.rating))
          .reduce((sum, item) => sum + item, 0) / product.reviews.length;
    }
    await product.save();

    res.send("review created");
  } catch (err) {
    next(err);
  }
};

//=============== With Session Added ===============
// const writeReview = async (req, res, next) => {
//   try {
//     const session = await Review.startSession();

//     // get comment, rating from request.body:
//     const { comment, rating } = req.body;
//     // validate request:
//     if (!(comment && rating)) {
//       return res.status(400).send("All inputs are required");
//     }

//     // create review id manually because it is needed also for saving in Product collection
//     const ObjectId = require("mongodb").ObjectId;
//     let reviewId = ObjectId();

//     session.startTransaction();
//     await Review.create(
//       [
//         {
//           _id: reviewId,
//           comment: comment,
//           rating: Number(rating),
//           user: {
//             _id: req.user._id,
//             name: req.user.name + " " + req.user.lastName,
//           },
//         },
//       ],
//       { session: session }
//     );

//     const product = await Product.findById(req.params.productId)
//       .populate("reviews")
//       .session(session);
//     //Check weather user alredy wrote a review for a product or not

//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user._id.toString() === req.user._id.toString()
//     );
//     if (alreadyReviewed) {
//       await session.abortTransaction();
//       session.endSession();
//       return res.status(400).send("product already reviewed");
//     }

//     let prc = [...product.reviews];
//     prc.push({ rating: rating });
//     //Store review id in product array

//     product.reviews.push(reviewId);
//     //If review added for first time

//     if (product.reviews.length === 1) {
//       product.rating = Number(rating);
//       product.reviewsNumber = 1;
//     } else {
//       product.reviewsNumber = product.reviews.length;
//       //Dynamic calculate average review

//       product.rating =
//         prc
//           .map((item) => Number(item.rating))
//           .reduce((sum, item) => sum + item, 0) / product.reviews.length;
//     }
//     await product.save();

//     await session.commitTransaction();
//     session.endSession();
//     res.send("review created");
//   } catch (error) {
//     //await session.abortTransaction();
//     next(error);
//   }
// };
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("firstName lastName email isAdmin")
      .orFail();
    return res.send(user);
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    //user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.isAdmin = req.body.isAdmin;

    await user.save();
    res.send("User Updated !");
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();

    await user.remove();
    res.send("User deleted");
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getUser,
  updateUser,
  deleteUser,
};
