import { Router } from "express";
import { noteController } from "./note.controller";
import { requireAuth, requireRole } from "../../middleware/auth";

export const noteRouter = Router()

noteRouter.post('/',  noteController.addNote)
noteRouter.put('/:id', noteController.updateNote)
noteRouter.delete('/:id', noteController.deleteNote)

//get all notes for specific user
noteRouter.get('/user/:id', noteController.getUserNotes)

//only for admin
//passed 2 middlewares -> requireAuth(in server.ts) & requireRole
noteRouter.get('/', requireRole(['admin']), noteController.getAll)
noteRouter.get('/:id', requireRole(['admin']), noteController.getById)