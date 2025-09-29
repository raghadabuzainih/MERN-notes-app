import { Note } from "./note.entity"

class NoteRepository{
    private notes: Note[] = []

    findAll(): Note[]{
        return this.notes
    }

    findById(id: string): Note | undefined{
        console.log(this.notes)
        console.log(this.notes.find(note => note.id === id))
        return this.notes.find(note => note.id === id)
    }

    insert(note: Omit<Note, 'id'>): Note{
        const newNode: Note = {id: `note-${this.notes.length}`, ...note}
        this.notes.push(newNode)
        return newNode
    }

    updateNote(id: string, updating: Partial<Note>): Note | undefined{
        let index = this.notes.findIndex(note => note.id === id)
        if(index === -1) return undefined
        this.notes.splice(index, 1, {...this.notes[index], ...updating} as Note)
        return this.notes[index]
    }

    deleteById(id: string): Note | undefined{
        const noteIndex: number = this.notes.findIndex(note => note.id === id)
        const deletedNote = this.notes[noteIndex]
        this.notes.splice(noteIndex, 1)
        return deletedNote
    }
}

export const noteRepo = new NoteRepository()