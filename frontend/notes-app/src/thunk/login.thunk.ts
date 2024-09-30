import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../untils/axiosIntance";

interface login {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "user/login",
  async (data: login, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
