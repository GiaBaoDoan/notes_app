import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../untils/axiosIntance";

export const reverifyEmail = createAsyncThunk(
  "auth/reverifyEmail",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/auth/reverify-email`, { email });
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);
