import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../untils/axiosIntance";

export const searchNote = createAsyncThunk(
  "notes/searchNote",
  async (query: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/notes/search-note?query=${query}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
