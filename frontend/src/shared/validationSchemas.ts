import * as Yup from 'yup'
import { getUsers } from '../modules/user/api'
import { AxiosError } from 'axios'

const fetchUsers = async() => {
    try{
        const users = await getUsers()
        return users
    }catch(err){
        const error = err as AxiosError<{message: string}>
        console.log(error.response?.data?.message)
        return []
    }
}

export const registerValidation = Yup.object({
    fullName: Yup.string().required('fullname is required').min(10, 'minimum number of characters is 10'),
    email: Yup.string().required('email is required')
    .email('enter valid email').test('existEmail', 'user exists', async(value)=> {
        const users = await fetchUsers()
        if(!users) return false
        return users.find(user => user.email === value)===undefined
    }),
    password: Yup.string().min(8, 'minimum number of charachters is 8').required('password is required')
    .matches(/[A-Z]/, 'Must contain uppercase'),
    role: Yup.string().required('must select role').test('roleValue', 'role must be member or admin', (value)=> value === 'member' || value === 'admin')
})

export const LoginValidation = Yup.object({
    email: Yup.string().required('email is required').test('correctEmail', 'incorrect email', async(value)=> {
        const users = await fetchUsers()
        if(!users) return false
        return users.find(user => user.email === value)!==undefined
    }),
    //test if password correct -> from backend side because saved password in db was hashing & the value we entered in the front side not hashing..
    //so every test in front side give false --> (savedUser.password != value we entered to password field)
    password: Yup.string().required('password is required')
})

export const NoteValidation = Yup.object({
    //take min from note.zod -> backened
    title: Yup.string().required('title is required').min(2, 'minimum number of characters is 2'),
    content: Yup.string().required('content is required').min(10, 'minimum number of characters is 10')
})