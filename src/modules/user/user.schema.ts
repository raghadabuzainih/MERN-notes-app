import { Schema } from "mongoose";
import { User } from "./user.entity";

export const userSchema = new Schema<User>({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        required: true
    }
}, {timestamps: true})