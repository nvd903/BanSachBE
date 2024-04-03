const express = require("express");
const router = express.Router();

const authController = require("../controllers/AuthController");
const middlewareController = require("../controllers/MiddlewareController");

router.post("/singup", authController.register);
router.post("/login", authController.login);
router.post("/refreshtoken", authController.requestRefreshToken);
router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.userLogout
);

module.exports = router;
