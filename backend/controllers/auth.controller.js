const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const { sendOtpToEmail } = require("../utils/helpers");
const createCustomError = require("../config/customError");

// Hàm đăng ký
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createCustomError("Email đã được đăng ký !!", 400));
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      isVerified: false,
    });
    await newUser.save();
    await sendOtpToEmail(email, newUser);
    res.status(200).json({
      message: "Đăng ký thành công, xác thực email của bạn",
    });
  } catch (error) {
    return next();
  }
};

// Hàm đăng nhập
const login = async (req, res, next) => {
  const { email, password } = req.body;
  // Tìm người dùng trong cơ sở dữ liệu
  const user = await User.findOne({ email });
  if (!user || !user.isVerified) {
    return next(createCustomError("Tài khoản hoặc mật khẩu không đúng", 404));
  }
  // So sánh mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(createCustomError("Tài khoản hoặc mật khẩu không đúng", 400));
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
      return next(createCustomError("Không tìm thấy người dùng", 404));
    }
    // Kiểm tra mật khẩu hiện tại có đúng không
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return next(createCustomError("Mật khẩu hiện tại không chính xác", 400));
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res
      .status(200)
      .json({ message: "Cập nhật mật khẩu mới thành công" });
  } catch (err) {
    return next();
  }
};

// edit profile
const editProfile = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return next(createCustomError("Vui lòng điền đầy đủ thông tin !!", 400));
  }
  try {
    const user = await User.findById(req.user.user._id);
    if (!user)
      return next(createCustomError("Không tìm thấy người dùng !!", 404));

    user.email = email;
    user.name = name;
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await user.save();
    return res.status(200).json({ message: "Cập nhật thành công!", token });
  } catch (err) {
    return next();
  }
};

// verify email
const verifyEmail = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById({ _id: decoded.id });
    if (!user)
      return next(createCustomError("Không tìm thấy người dùng !!", 404));
    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "Xác thực email thành công" });
  } catch (error) {
    return next();
  }
};

// reverify email
const reverifyEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return next(createCustomError("Email chưa được đăng ký !!", 404));
    await sendOtpToEmail(email, user);
    res.status(200).json({
      message: "Đã xác thực tới email",
    });
  } catch (err) {
    return next();
  }
};

// reset password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        return next(
          createCustomError("Phiên đặt lại mật khẩu đã hết hạn !", 403)
        );
      }
      const user = await User.findOne({ _id: decode.id });
      if (!user)
        return next(createCustomError("Email chưa được đăng ký !!", 404));
      const hashPassword = bcrypt.hashSync(newPassword, 10);
      user.password = hashPassword;
      await user.save();
      return res.status(200).json({ message: "Cập nhật mật khẩu thành công" });
    });
  } catch (err) {
    return next();
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
