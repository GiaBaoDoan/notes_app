import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../untils/axiosIntance";

interface data {
  email: string;
  name: string;
}

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async (data: data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/edit-profile", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
