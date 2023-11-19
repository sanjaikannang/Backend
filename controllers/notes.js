import Note from "../models/notesmodel.js";
import mongoose from "mongoose";

//writenotes
export const writeNote = async (req, res) => {
  const { title, body, labels } = req.body;
  const userId = req.userId;

  const newNote = new Note({
    title,
    body,
    userId,
    labels,
  });

  try {
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!!!" });
  }
};

// Archive Note
export const archiveNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Note not found" });
  }

  try {
    const archivedNote = await Note.findByIdAndUpdate(
      id,
      { archived: true },
      { new: true }
    );

    if (!archivedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(archivedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!!!" });
  }
};

//get notes
export const getNotes = async (req, res) => {
  const userId = req.userId;

  try {
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!!!" });
  }
};

// edit notes
export const editNote = async (req, res) => {
  const { id } = req.params;
  const { title, body, labels } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Note not found" });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, body, labels, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!!!" });
  }
};

// delete notes
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Note not found" });
  }

  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully", deletedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!!!" });
  }
};

// Get Archived Notes
export const getArchivedNotes = async (req, res) => {
  const userId = req.userId;

  try {
    const archivedNotes = await Note.find({ userId, archived: true }).sort({ createdAt: -1 });
    res.status(200).json(archivedNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!!!" });
  }
};

//get NotesWithLabels
export const getNotesWithLabels = async (req, res) => {
  const userId = req.userId;

  try {
    const notesWithLabels = await Note.find({ userId, labels: { $exists: true, $not: { $size: 0 } } }).sort({ createdAt: -1 });
    res.status(200).json(notesWithLabels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!!!" });
  }
};

//getting notes details by id
export const getNoteDetails = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Note not found" });
  }

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!!!" });
  }
};