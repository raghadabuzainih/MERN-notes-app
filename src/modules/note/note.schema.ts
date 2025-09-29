import { Schema } from "mongoose"
import { Note } from "./note.entity"

export const noteSchema = new Schema<Note>({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    content: {
        type: String,
        required: [true, 'content is required'],
        minlength: [10, 'minimum number of characters is 10']
    }
}, {timestamps: true})