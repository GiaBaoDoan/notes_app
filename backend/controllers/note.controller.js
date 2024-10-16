const createCustomError = require("../config/customError");
const Note = require("../models/notes.model");
// get all notes
const getNotes = async (req, res, next) => {
  const { user } = req.user;
  const { query, page = 1, limit = 11 } = req.query;
  const regex = query ? { $regex: query, $options: "i" } : null;

  try {
    const skip = (page - 1) * limit;
    const baseQuery = { userId: user._id };
    const filter = query
      ? {
          ...baseQuery,
          $or: [
            { title: regex },
            { content: regex },
            { tags: { $in: [new RegExp(query, "i")] } },
          ],
        }
      : baseQuery;

    const notes = await Note.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ isPinned: -1 });
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
  const { user } = req.user; // Giả định `req.user` chứa thông tin người dùng
  const { title, content, tags, isPinned } = req.body; // Lấy thông tin cập nhật từ body

  // Kiểm tra nếu `title` hoặc `content` bị thiếu
  if (!title || !content) return next(createCustomError("Bad request", 404));
  try {
    // Tìm kiếm ghi chú dựa trên `noteId` và `userId`
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return next(createCustomError("Không tìm thấy note !!", 404));
    }
    // Cập nhật các trường dữ liệu nếu có
    note.title = title;
    note.content = content;
    note.isPinned = isPinned;
    // Nếu có `tags` được cung cấp, cập nhật luôn
    if (tags && Array.isArray(tags)) {
      note.tags = tags;
    }
    // Lưu lại các thay đổi
    const updatedNote = await note.save();
    // Trả về ghi chú đã cập nhật
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
const pinNote = async (req, res, next) => {
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
