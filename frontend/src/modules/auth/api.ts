import { axiosClient } from "../../api/axiosClient";
import { User } from "../../types/User";

export const signup = async(data: User) => {
    const res = await axiosClient.post('/auth/signup', data)
    return res.data
}

export const signin = async(data: Pick<User, 'email' | 'password'>) => {
    const res = await axiosClient.post('/auth/signin', data)
    return res.data
}