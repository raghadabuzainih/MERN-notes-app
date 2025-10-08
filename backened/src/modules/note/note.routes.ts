import { Router } from "express";
import { noteController } from "./note.controller";
import { requireAuth, requireRole } from "../../middleware/auth";

export const noteRouter = Router()

//get all notes for current user
noteRouter.get('/my-notes', noteController.getUserNotes)

noteRouter.post('/my-notes',  noteController.addNote)
noteRouter.put('/my-notes/:id', noteController.updateNote)
noteRouter.delete('/my-notes/:id', noteController.deleteNote)
noteRouter.get('/:id', noteController.getById)

//only for admin
//passed 2 middlewares -> requireAuth(in server.ts) & requireRole
noteRouter.get('/', requireRole(['admin']), noteController.getAll)