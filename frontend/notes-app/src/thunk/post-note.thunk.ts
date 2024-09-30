import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../untils/axiosIntance";
import { getNotes } from "./notes.thunk";

type Note = {
  title: string;
  content: string;
  tags: string[];
};

export const postNote = createAsyncThunk(
  "notes/postNote",
  async (note: Note, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post(`/notes/add-note/`, note);
      dispatch(getNotes(""));
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
