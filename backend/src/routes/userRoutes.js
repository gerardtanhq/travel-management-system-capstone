const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");

router.post(
  "/login",
  userController.login,
  bcryptMiddleware.comparePassword,
  jwtMiddleware.generateToken,
  userController.sendToken
);

module.exports = router;
