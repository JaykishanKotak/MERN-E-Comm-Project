const jwt = require("jsonwebtoken");

const verifyIsLoggedIn = (req, res, next) => {
  //next();
  //return;
  //to do : remove later
  try {
    //Go to next middleware
    //next();
    //console.log("1", JSON.stringify(req.cookies));
    const token = req.cookies.access_token;
    //console.log("cookie", token);
    if (!token) {
      return res.status(403).send("A token is required for the authentication");
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decode;
      next();
    } catch (error) {
      return res.status(401).send("Unauthorized. Invalid Token");
    }
  } catch (error) {
    next(error);
  }
};

const verifyIsAdmin = async (req, res, next) => {
  //next();
  //return;
  //to do : remove later
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return res.status(401).send("Unauthorized, Admin Required.");
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { verifyIsLoggedIn, verifyIsAdmin };
