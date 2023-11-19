import mongoose from "mongoose";

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  userId: {
    type: String, 
    required: true,
  },
  labels: [
    { type: String }
  ],
  archived: {
   type: Boolean, default: false
   },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Note = mongoose.model('Note', NoteSchema);

export default Note;



