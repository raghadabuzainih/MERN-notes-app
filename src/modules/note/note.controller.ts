import { Request, Response } from "express";
import { noteService } from "./note.service";
class NoteController {
    //all notes from all users
    async getAll(req: Request, res: Response){
        try{
            const notes = await noteService.getAllNotes()
            res.status(200).json({notes})
        }catch(error){
            res.status(500).json({error})
        }
    }
    async getById(req: Request, res: Response){
        try{
            const id: string | undefined = req.params.id
            if(!id) return res.status(400).json({message: 'id not found'})
            const note = await noteService.findNote(id)
            if(!note) return res.status(400).json({message: 'note not found'})
            res.status(200).json({note})
        }catch(error){
            res.status(500).json({error})
        }
    }
    async getUserNotes(req: Request, res: Response){
        try{
            const id: string | undefined = req.params.id
            if(!id) return res.status(400).json({message: 'id not found'})
            const notes = await noteService.findUserNotes(id)
            res.status(200).json({notes})
        }catch(error){
            res.status(500).json({error})
        }
    }
    async addNote(req: Request, res: Response){
        try{
            const data = req.body
            const user = res.locals.user //from checkAuth
            const note = await noteService.addNote({...data, user_id: user.id})            
            res.status(200).json({note})
        }catch(error){
            res.status(500).json({error})
        }
    }
    async updateNote(req: Request, res: Response){
        try{
            const id = req.params.id
            const note = req.body
            if(!id) return res.status(400).json({message: 'id not found'})
            const updated = await noteService.updateNote(id, note)
            if(!updated) return res.status(400).json({message: 'note not found'})
            res.status(200).json({note: updated})
        }catch(error){
            res.status(500).json({error})
        }
    }
    async deleteNote(req: Request, res: Response){
        try{
            const id: string | undefined = req.params.id
            if(!id) return res.status(400).json({message: 'id not found'})
            const deletedNote = await noteService.removeNote(id)
            if(!deletedNote) return res.status(400).json({message: 'note not found'})
            res.status(200).json({deletedNote})
        }catch(error){
            res.status(500).json({error})
        }
    } 
}

export const noteController = new NoteController()