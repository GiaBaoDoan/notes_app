import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../untils/axiosIntance";
import { getNotes } from "./notes.thunk";

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.delete(`/notes/delete-note/${id}`);
      dispatch(getNotes(""));
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
