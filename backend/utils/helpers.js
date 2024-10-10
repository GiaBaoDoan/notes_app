const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const generateOTP = () => {
  const otpLength = 6; // Độ dài OTP
  let otp = "";
  for (let i = 0; i < otpLength; i++) {
    otp += Math.floor(Math.random() * 10); // Tạo số ngẫu nhiên từ 0-9
  }
  return otp;
};

const sendOtpToEmail = async (email, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const optionLink = !user.isVerified
    ? `https://notes-app-iwwr.vercel.app/verify-email/${token}`
    : `https://notes-app-iwwr.vercel.app/reset-password/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: !user.isVerified ? "Vertication email" : "Reset password",
    host: "smtp.gmail.com", // Máy chủ SMTP của Gmail
    port: 465, // Sử dụng cổng 465 cho kết nối bảo mật SSL/TLS
    secure: true,
    text: optionLink,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred: ", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  generateOTP,
  sendOtpToEmail,
};
