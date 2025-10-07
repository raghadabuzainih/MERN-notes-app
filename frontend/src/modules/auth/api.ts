import { axiosClient } from "../../api/axiosClient";
import { excludedTypes } from "../../types/shared";
import { User } from "../../types/User";

export const signup = async(data: Omit<User, excludedTypes>) : Promise<User> => {
    const res = await axiosClient.post('/auth/signup', data)
    return res.data.user
}

export const signin = async(data: Pick<User, 'email' | 'password'>) : Promise<User> => {
    const res = await axiosClient.post('/auth/signin', data)
    return res.data.user
}