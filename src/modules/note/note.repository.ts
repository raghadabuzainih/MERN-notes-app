import { Note } from "./note.entity"
import { noteModel } from "./note.model"
import { GenericRepository } from "../../shared/repository"

class NoteRepository extends GenericRepository<Note>{
    constructor(){
        super(noteModel)
    }
    async getUserNotes(userID: string): Promise<Note[]>{
        return await noteModel.find({user_id: userID})
    }
}

export const noteRepo = new NoteRepository()