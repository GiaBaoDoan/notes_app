const express = require("express");

const router = express.Router();
const {
  register,
  login,
  getUser,
  changePassword,
  editProfile,
} = require("../controllers/auth.controller.js");

const authMiddleware = require("../middelware.js");
// verify token
router.get("/verify-token", authMiddleware, (req, res) => {
  return res.status(200).send("ok");
});
// router change password
router.post("/change-password", authMiddleware, changePassword);

// router change profile
router.post("/edit-profile", authMiddleware, editProfile);

// Route đăng ký
router.post("/register", register);
// Route đăng nhập
router.post("/login", login);

// Route lấy người dùng
router.get("/user", authMiddleware, getUser);

module.exports = router;
