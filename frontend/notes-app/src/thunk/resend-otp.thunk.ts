import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../untils/axiosIntance";

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/auth/resend-otp`, { email });
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);
