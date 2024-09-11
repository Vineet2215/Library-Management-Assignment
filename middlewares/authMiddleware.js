const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = "adhafhfahfahfhffhfhfhffafafahb";

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
        // console.log("JWT_SECRET:", process.env.JWT_SECRET);

      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.redirect("/auth/login");
    }
  } else if (req.path === "/auth/login" || req.path === "/auth/signup") {
    next();
  } else {
    res.redirect("/auth/login");
  }
};
