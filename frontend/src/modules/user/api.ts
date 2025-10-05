import { axiosClient } from "../../api/axiosClient";
import { excludedTypes } from "../../types/shared";
import { User } from "../../types/User";

export const getUsers = async() : Promise<User[]> => {
    const res = await axiosClient.get('/users')
    return res.data
}

export const getUser = async(id: string) : Promise<User> => {
    const res = await axiosClient.get(`/users/${id}`)
    return res.data
}

export const addUser = async(data: Omit<User, excludedTypes>) : Promise<User> => {
    const res = await axiosClient.post('/users', data)
    return res.data
}

export const updateUser = async(id: string) : Promise<User> => {
    const res = await axiosClient.post(`/users/${id}`)
    return res.data
}

export const deleteUser = async(id: string) : Promise<User> => {
    const res = await axiosClient.post(`/users/${id}`)
    return res.data
}