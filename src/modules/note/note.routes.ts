import { Router } from "express";
import { noteController } from "./note.controller";

export const router = Router()

router.get('/notes', noteController.getAll)
router.get('/notes/:id', noteController.getById)
router.post('/notes', noteController.addNote)
router.put('/notes/:id', noteController.updateNote)
router.delete('/notes/:id', noteController.deleteNote)

//get all notes for specific user
router.get('/users/:id/notes', noteController.getUserNotes)