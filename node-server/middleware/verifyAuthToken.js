const jwt = require("jsonwebtoken");

const verifyIsLoggedIn = (req, res, next) => {
  try {
    //Go to next middleware
    //next();
    //console.log("1", JSON.stringify(req.cookies));
    const token = req.cookies.access_token;
    //console.log("cookie", token);
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send("Unauthorized. Invalid Token");
    }
  } catch (error) {
    next(error);
  }
};

const verifyIsAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).send("Unauthorized. Admin required");
  }
};

module.exports = { verifyIsLoggedIn, verifyIsAdmin };
