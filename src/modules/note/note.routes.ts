import { Router } from "express";
import { noteController } from "./note.controller";

export const router = Router()

router.get('/', noteController.getAll)
router.get('/:id', noteController.getById)
router.post('/', noteController.addNote)
router.put('/:id', noteController.updateNote)
router.delete('/:id', noteController.deleteNote)

