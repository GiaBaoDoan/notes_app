const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

// Hàm đăng ký
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Kiểm tra nếu email đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email đã được đăng ký" });
    }

    // Mã hóa mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Tạo JWT token cho người dùng mới
    const token = jwt.sign({ newUser }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token có hiệu lực trong 1 giờ
    });

    // Trả về thông tin người dùng và token
    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Có lỗi xảy ra" });
  }
};

// Hàm đăng nhập
const login = async (req, res) => {
  const { email, password } = req.body;
  // Tìm người dùng trong cơ sở dữ liệu
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // So sánh mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "10h", // Token có hiệu lực trong 1 giờ
  });

  // Đăng nhập thành công
  res.json({ message: "Login successful", token, email });
};
// get user
const getUser = async (req, res) => {
  const { user } = req.user;
  return res.status(200).json(user);
};

// change password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    // Lấy thông tin người dùng hiện tại
    const user = await User.findById(req.user.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Kiểm tra mật khẩu hiện tại có đúng không
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", err });
  }
};
// edit profile
const editProfile = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: true, message: "Bad request !!" });
  }
  try {
    // const checkEmailExist = await User.findOne({ email });
    // if (checkEmailExist) {
    //   return res.status(400).json({ error: true, message: "Email is used !!" });
    // }
    const user = await User.findById(req.user.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.email = email;
    user.name = name;
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "10h", // Token có hiệu lực trong 1 giờ
    });
    await user.save();
    return res.status(200).json({ message: "Update successfully!", token });
  } catch (err) {
    return res.status(500).send("Server error !");
  }
};

module.exports = {
  register,
  login,
  getUser,
  editProfile,
  changePassword,
};
