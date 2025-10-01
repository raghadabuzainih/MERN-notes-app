import { Note } from "./note.entity";
import { noteRepo } from "./note.repository";

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
        return await noteRepo.insert(note) 
    }

    async updateNote(id: string, updating: Partial<Omit<Note, 'user_id'>>){ 
        return await noteRepo.update(id, updating)
    }

    async removeNote(id: string){ 
        return await noteRepo.deleteById(id) 
    }
}

export const noteService = new NoteService()