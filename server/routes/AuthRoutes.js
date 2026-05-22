
const express =
require("express");

const router =
express.Router();

const {

  register,
  login,
  forgotPassword,
  getUsers,
} = require(
  "../controllers/AuthController"
);

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.put(
  "/forgot-password",
  forgotPassword
);

router.get(
  "/users",
  getUsers
);

module.exports =
router;

