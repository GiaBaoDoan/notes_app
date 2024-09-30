const jwt = require("jsonwebtoken");

// Middleware để kiểm tra JWT
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Lấy token từ header
  if (!token) {
    return res
      .status(401)
      .json({ error: "Không có token, quyền truy cập bị từ chối" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Lưu thông tin người dùng vào req.user
    next(); // Cho phép tiếp tục xử lý yêu cầu
  } catch (err) {
    res
      .status(400)
      .json({ error: "Token không hợp lệ hoặc phiên đăng nhập hết hạn" });
  }
};

module.exports = authMiddleware;
