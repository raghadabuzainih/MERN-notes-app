import { User } from "./user.entity";
import {Schema} from "mongoose";
import { isEmail, isStrongPassword } from "validator";

export const userSchema = new Schema<User>({
    fullName: {
        type: String,
        required: [true, 'fullname is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        validate: [isEmail, 'enter valid email']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        validate: [isStrongPassword, 'enter strong password']
    }
}, {timestamps: true})