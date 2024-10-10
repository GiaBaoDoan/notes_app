const jwt = require("jsonwebtoken");

// Middleware để kiểm tra JWT
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Lấy token từ header
  if (!token) {
    return next(
      createCustomError("Không có token quyền truy cập bị từ chối !!", 401)
    );
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Lưu thông tin người dùng vào req.user
    next(); // Cho phép tiếp tục xử lý yêu cầu
  } catch (err) {
    next(
      createCustomError(
        "Đã hết phiên đăng nhập, vui lòng đăng nhập lại !!",
        403
      )
    );
  }
};

module.exports = authMiddleware;
