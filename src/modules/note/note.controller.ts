import { Request, Response } from "express";
import { noteService } from "./note.service";
import { Note } from "./note.entity";

class NoteController {
    getAll(req: Request, res: Response){
        try{
            const notes = noteService.getNotes()
            res.status(200).json({notes})
        }catch(error){
            res.status(400).json({error})
        }
    }
    getById(req: Request, res: Response){
        try{
            const id: string | undefined = req.params.id
            if(!id) return res.status(400).json({message: 'id not found'})
            console.log(id)
            const note = noteService.findNote(id)
            if(!note) return res.status(400).json({message: 'note not found'})
            res.status(200).json({note})
        }catch(error){
            res.status(400).json({error})
        }
    }
    addNote(req: Request, res: Response){
        try{
            const data = req.body
            const note = noteService.addNote(data)
            res.status(200).json({note})
        }catch(error){
            res.status(400).json({error})
        }
    }
    updateNote(req: Request, res: Response){
        try{
            const id = req.params.id
            const note = req.body
            if(!id) return res.status(400).json({message: 'id not found'})
            const updated = noteService.updateNote(id, note)
            if(!updated) return res.status(400).json({message: 'note not found'})
            res.status(200).json({note: updated})
        }catch(error){
            res.status(400).json({error})
        }
    }
    deleteNote(req: Request, res: Response){
        try{
            const id: string | undefined = req.params.id
            if(!id) return res.status(400).json({message: 'id not found'})
            const deletedNote = noteService.removeNote(id)
            if(!deletedNote) return res.status(400).json({message: 'note not found'})
            res.status(200).json({deletedNote})
        }catch(error){
            res.status(400).json({error})
        }
    } 
}

export const noteController = new NoteController()