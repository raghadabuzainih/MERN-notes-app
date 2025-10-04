import mongoose, { Schema } from "mongoose"
import { Note } from "./note.entity"

export const noteSchema = new Schema<Note>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})