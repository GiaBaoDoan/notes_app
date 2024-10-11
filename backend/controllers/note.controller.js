const createCustomError = require("../config/customError");
const Note = require("../models/notes.model");
// get all notes
const getNotes = async (req, res) => {
  const { query } = req.query;

  try {
    const filter = {
      $or: [
        { title: regex },
        { content: regex },
        { tags: { $in: [new RegExp(query, "i")] } },
      ],
    };

    const notes = await Note.find(filter).sort({ isPinned: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    return next();
  }
};
// add notes
const postNotes = async (req, res, next) => {
  const { user } = req.user;
  const { title, content, tags } = req.body;
  if (!title || !content) return next(createCustomError("Bad request", 404));
  try {
    const note = new Note({
      title,
      content,
      tags,
      userId: user._id,
    });
    await note.save();
    return res.status(200).json({ message: "Create note successfully!!" });
  } catch (err) {
    return next();
  }
};
//  edit notes
const editNote = async (req, res, next) => {
  const noteId = req.params.id;
  const { user } = req.user;
  const { title, content, tags, isPinned } = req.body;

  if (!title || !content) return next(createCustomError("Bad request", 404));
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return next(createCustomError("Không tìm thấy note !!", 404));
    }
    note.title = title;
    note.content = content;
    note.isPinned = isPinned;
    if (tags && Array.isArray(tags)) {
      note.tags = tags;
    }
    const updatedNote = await note.save();
    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong while updating the note!",
    });
  }
};
const pinNote = async (req, res) => {
  const noteId = req.params.id;
  const { user } = req.user;
  const queries = { _id: noteId, userId: user._id };
  try {
    const note = await Note.findOne(queries);
    if (!note) {
      return next(createCustomError("Không tìm thấy note !!", 404));
    }
    note.isPinned = !note.isPinned;
    const updatedNote = await note.save();
    // Trả về ghi chú đã cập nhật
    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (err) {
    return next();
  }
};

// delete notes
const deleteNote = async (req, res, next) => {
  const noteId = req.params.id;
  const { user } = req.user;
  const queries = { _id: noteId, userId: user._id };
  try {
    const note = await Note.findOne(queries);
    if (!note) {
      return next(createCustomError("Không tìm thấy note !!", 404));
    }
    await Note.deleteOne(queries);
    return res.status(200).json({
      error: true,
      message: "Delete successfully !!",
    });
  } catch (err) {
    return next();
  }
};

module.exports = {
  getNotes,
  postNotes,
  editNote,
  deleteNote,
  pinNote,
};
