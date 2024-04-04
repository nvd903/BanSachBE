const jwt = require("jsonwebtoken");

class MiddlewareController {
  verifyToken(req, res, next) {
    const token = req.headers.token;
    if (token) {
      //   const accessToken = token.split(" ", token)[1];
      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("you're not authencated");
    }
  }
  verifyTokenAndAdminAuth(req, res, next) {
    const token = req.headers.token;
    if (token) {
      //   const accessToken = token.split(" ", token)[1];
      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          res.status(403).json("Token is not valid");
        }
        req.user = user;
        if (req.user.id === req.params.id || req.user.isadmin) {
          next();
        } else {
          res.status(403).json("You're not allowed delete other");
        }
      });
    } else {
      res.status(401).json("you're not authencated");
    }
  }
}

module.exports = new MiddlewareController();
