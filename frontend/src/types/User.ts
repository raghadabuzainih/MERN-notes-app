import { shared } from "./shared";
export interface User extends shared{
    fullName: string,
    email: string,
    password: string,
    role: 'admin' | 'member'
}