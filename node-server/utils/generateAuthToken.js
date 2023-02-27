const jwt = require("jsonwebtoken");

const generateAuthToken = (_id, firstName, lastName, email, isAdmin) => {
  return jwt.sign(
    { _id, firstName, lastName, email, isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "48h" }
  );
};
module.exports = generateAuthToken;
