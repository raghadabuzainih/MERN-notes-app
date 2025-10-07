import { axiosClient } from "../../api/axiosClient";
import { excludedTypes } from "../../types/shared";
import { User } from "../../types/User";

export const getUsers = async() : Promise<User[]> => {
    const res = await axiosClient.get('/users')
    //responce shape(res.data) -> {users: [{...}, {...},.......]} - see user.routes.ts
    //so i want to access users
    return res.data.users
}

export const getUser = async(id: string) : Promise<User> => {
    const res = await axiosClient.get(`/users/${id}`)
    return res.data.user
}

export const addUser = async(data: Omit<User, excludedTypes>) : Promise<User> => {
    const res = await axiosClient.post('/users', data)
    return res.data.result
}

export const updateUser = async(id: string) : Promise<User> => {
    const res = await axiosClient.post(`/users/${id}`)
    return res.data.user
}

export const deleteUser = async(id: string) : Promise<User> => {
    const res = await axiosClient.post(`/users/${id}`)
    return res.data.deletedUser
}