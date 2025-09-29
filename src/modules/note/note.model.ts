import mongoose from "mongoose";
import { noteSchema } from "./note.schema";
import { Note } from "./note.entity";

export const noteModel = mongoose.model<Note>("Note", noteSchema)