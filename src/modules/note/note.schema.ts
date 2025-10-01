import mongoose, { Schema } from "mongoose"
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
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})