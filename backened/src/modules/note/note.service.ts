import { Note } from "./note.entity";
import { noteRepo } from "./note.repository";
import { noteZod } from "./note.zod";

class NoteService{
    async getAllNotes(){ 
        return await noteRepo.findAll() 
    }

    async findNote(id: string){ 
        return await noteRepo.findById(id) 
    }

    async findUserNotes(user_id: string){
        return await noteRepo.getUserNotes(user_id)
    }

    async addNote(note: Omit<Note, 'id'>){
        const parsed = noteZod.parse(note)
        return await noteRepo.insert(note) 
    }

    async updateNote(id: string, updating: Partial<Omit<Note, 'user_id'>>){ 
        const parsed = noteZod.partial().strict().parse(updating)
        return await noteRepo.update(id, updating)
    }

    async removeNote(id: string){ 
        return await noteRepo.deleteById(id) 
    }
}

export const noteService = new NoteService()