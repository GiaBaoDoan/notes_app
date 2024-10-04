import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../untils/axiosIntance";

type data = {
  newPassword: string;
  token: string;
};

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/auth/reset-password`, data);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);
