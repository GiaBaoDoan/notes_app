const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Bắt buộc nhập
      trim: true, // Loại bỏ khoảng trắng ở đầu và cuối
    },
    email: {
      type: String,
      required: true, // Bắt buộc nhập
      unique: true, // Email phải là duy nhất
      trim: true, // Loại bỏ khoảng trắng
      lowercase: true, // Chuyển email thành chữ thường
    },
    password: {
      type: String,
      required: true, // Bắt buộc nhập
      minlength: 6, // Mật khẩu phải có ít nhất 6 ký tự
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
