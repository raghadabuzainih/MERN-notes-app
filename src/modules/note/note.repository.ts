import { Note } from "./note.entity"
import { noteModel } from "./note.model"
class NoteRepository{

    async findAll(): Promise<Note[]>{
        return await noteModel.find()
    }

    async findById(id: string): Promise<Note | null>{
        return await noteModel.findById(id)
    }

    async insert(note: Omit<Note, '_id'>): Promise<Note>{
        return await noteModel.create(note)
    }

    async updateNote(id: string, updating: Partial<Note>): Promise<Note | null>{
        //{new: true} -> to return the newest(updated) version of item
        return await noteModel.findByIdAndUpdate(id, updating, {new: true})
    }

    async deleteById(id: string): Promise<Note | null>{
        return noteModel.findByIdAndDelete(id)
    }
}

export const noteRepo = new NoteRepository()