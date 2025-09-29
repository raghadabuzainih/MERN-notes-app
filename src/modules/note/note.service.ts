import { Note } from "./note.entity";
import { noteRepo } from "./note.repository";

class NoteService{
    getNotes(){ 
        return noteRepo.findAll() 
    }

    findNote(id: string){ 
        return noteRepo.findById(id) 
    }

    addNote(note: Omit<Note, 'id'>){ 
        return noteRepo.insert(note) 
    }

    updateNote(id: string, updating: Partial<Note>){ 
        return noteRepo.updateNote(id, updating)
    }

    removeNote(id: string){ 
        return noteRepo.deleteById(id) 
    }
}

export const noteService = new NoteService()