import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../untils/axiosIntance";
import { getNotes } from "./notes.thunk";

export const pinNote = createAsyncThunk(
  "notes/pinNote",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.put(`/notes/pin-note/${id}`);
      dispatch(getNotes(""));
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
