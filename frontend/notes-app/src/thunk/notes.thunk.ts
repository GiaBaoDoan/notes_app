import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../untils/axiosIntance";

export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (text: string = "", { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/notes?query=${text}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
