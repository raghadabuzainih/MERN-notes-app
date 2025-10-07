import { excludedTypes } from "../types/shared"
import { User } from "../types/User"

//for signup & adding new user from admin side
export const initialRegister: Omit<User, excludedTypes> = {
    fullName: '',
    email: '',
    password: '',
    role: 'member'
}

export const initialLogin: Pick<User, 'email' | 'password'> = {
    email: '',
    password: ''
}