export const BASE_URL = "https://notes-app-backend-5svd.onrender.com";

export const options: Intl.DateTimeFormatOptions = {
  day: "numeric",
  year: "numeric",
  month: "long",
};

export const PATH_URL = {
  HOME: "/", // Trang chính khi đã đăng nhập (có thể là dashboard hoặc home)
  PROFILE: "/edit-profile", // Trang chỉnh sửa thông tin cá nhân
  CHANGE_PASSWORD: "/change-password", // Trang đổi mật khẩu
  LOGIN: "/login", // Trang đăng nhập
  REGISTER: "/signup", // Trang đăng ký
  RESEND_OTP: "/resend-email", // Trang gửi lại OTP
  VERIFY_EMAIL: `/verify-email/:token`, // Xác thực email với token
  RESET_PASSWORD: `/reset-password/:token`, // Trang đặt lại mật khẩu với token
};
