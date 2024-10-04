import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../untils/axiosIntance";

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/auth/verify-email`, { token });
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);
