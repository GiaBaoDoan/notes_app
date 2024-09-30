const express = require("express");

const router = express.Router();
const {
  register,
  login,
  getUser,
} = require("../controllers/auth.controller.js");

const authMiddleware = require("../middelware.js");
// verify token
router.get("/verify-token", authMiddleware, (req, res) => {
  return res.status(200).send("ok");
});
// Route đăng ký
router.post("/register", register);
// Route đăng nhập
router.post("/login", login);
// Route lấy người dùng
router.get("/user", authMiddleware, getUser);

module.exports = router;
