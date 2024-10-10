const express = require("express");
const {
  getNotes,
  postNotes,
  editNote,
  deleteNote,
  pinNote,
  searchNotes,
} = require("../controllers/note.controller");
const authMiddleware = require("../middleware/middelware");
const router = express.Router();
router.get("/", authMiddleware, getNotes);
router.post("/add-note", authMiddleware, postNotes);
router.put("/edit-note/:id", authMiddleware, editNote);
router.put("/pin-note/:id", authMiddleware, pinNote);
router.delete("/delete-note/:id", authMiddleware, deleteNote);

module.exports = router;
