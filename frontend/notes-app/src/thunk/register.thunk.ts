import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../untils/axiosIntance";
type register = {
  name: string;
  email: string;
  password: string;
};

export const register = createAsyncThunk(
  "user/register",
  async (data: register, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
