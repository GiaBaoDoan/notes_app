import axios, { AxiosRequestHeaders } from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  } as unknown as AxiosRequestHeaders,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Thực hiện kịch bản gì đó trước khi gửi
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Thực hiện kịch bản gì đó khi yêu cầu bị lỗi
    return Promise.reject(error);
  }
);

export default axiosInstance;
