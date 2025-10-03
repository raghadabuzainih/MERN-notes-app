import { Document } from "mongoose";
export interface User extends Document{
    fullName: string,
    email: string,
    password: string,
    role: 'admin' | 'member'
}