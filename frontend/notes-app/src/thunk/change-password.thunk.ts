import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../untils/axiosIntance";

interface changePassword {
  currentPassword: string;
  newPassword: string;
}

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (data: changePassword, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/change-password", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
