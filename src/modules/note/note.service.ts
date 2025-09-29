import { Note } from "./note.entity";
import { noteRepo } from "./note.repository";

class NoteService{
    async getNotes(){ 
        return await noteRepo.findAll() 
    }

    async findNote(id: string){ 
        return await noteRepo.findById(id) 
    }

    async addNote(note: Omit<Note, 'id'>){ 
        return await noteRepo.insert(note) 
    }

    async updateNote(id: string, updating: Partial<Note>){ 
        return await noteRepo.updateNote(id, updating)
    }

    async removeNote(id: string){ 
        return await noteRepo.deleteById(id) 
    }
}

export const noteService = new NoteService()