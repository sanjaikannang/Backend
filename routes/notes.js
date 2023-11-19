import express from "express";
import auth from "../middleware/auth.js";
import {
  writeNote,
  archiveNote,
  getNotes,
  editNote,
  deleteNote,
  getArchivedNotes,
  getNotesWithLabels,
  getNoteDetails,
} from "../controllers/notes.js";

const router = express.Router();

router.post("/write", auth, writeNote);
router.put("/archivenotes/:id", auth, archiveNote);
router.get("/get", auth, getNotes);
router.put("/edit/:id", auth, editNote);
router.delete("/delete/:id", auth, deleteNote);
router.get("/archivednotes", auth, getArchivedNotes);
router.get("/getnoteswithlabels", auth, getNotesWithLabels);
router.get("/getnotesdetailsbyid/:id", auth, getNoteDetails);




export default router;