const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const { generateOTP, sendOtpToEmail } = require("../utils/helpers");

// Hàm đăng ký
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Kiểm tra nếu email đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email đã được đăng ký" });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword, // Hash password trước khi lưu
      isVerified: false,
    });
    await newUser.save();
    await sendOtpToEmail(email, newUser);
    res.status(200).json({
      message: "Đăng ký thành công, xác thực email của bạn",
    });
  } catch (error) {
    res.status(500).json({ error: "Có lỗi xảy ra" });
  }
};

// Hàm đăng nhập
const login = async (req, res) => {
  const { email, password } = req.body;
  // Tìm người dùng trong cơ sở dữ liệu
  const user = await User.findOne({ email });
  if (!user || !user.isVerified) {
    return res
      .status(400)
      .json({ message: "Tài khoản hoặc mật khẩu không đúng" });
  }
  // So sánh mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "Tài khoản hoặc mật khẩu không đúng" });
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

// verify email
const verifyEmail = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById({ _id: decoded.id });

    if (!user) {
      return res.status(404).json({ message: "không tìm thấy người dùng " });
    }
    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "Xác thực email thành công" });
  } catch (error) {
    res.status(400).json({ message: "Đã hết thời hạn xác thực email" });
  }
};

// reverify email
const reverifyEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }
    await sendOtpToEmail(email, user);
    res.status(200).json({
      message: "Kiểm tra email của bạn",
    });
  } catch (err) {
    res.status(500).json({ error: "Có lỗi xảy ra" });
  }
};

// reset password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Phiên xác thực đã hết hạn hoặc không hợp lệ" });
      } // Lấy userId từ decoded token
      // Bạn có thể tiếp tục thực hiện các hành động khác tại đây
      const user = await User.findOne({ _id: decode.id });
      if (!user) {
        return res.status(404).json({ message: "không tìm thấy người dùng " });
      }
      const hashPassword = bcrypt.hashSync(newPassword, 10);
      await User.updateOne(
        {
          _id: decode.id,
        },
        {
          $set: {
            password: hashPassword,
          },
        }
      );
      await user.save();
      return res.status(200).json({ message: "Cập nhật mật khẩu thành công" });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Co loi xay ra" });
  }
};

module.exports = {
  register,
  login,
  getUser,
  editProfile,
  changePassword,
  verifyEmail,
  reverifyEmail,
  resetPassword,
};
