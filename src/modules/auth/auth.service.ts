import { User } from "../user/user.entity";
import { userModel } from "../user/user.model";
import jwt, { Secret } from 'jsonwebtoken'
import 'dotenv/config'
import argon2 from 'argon2'
import { signupZod, signinZod } from "./auth.zod";

const secret = process.env.JWT_secret as Secret

const createToken = (id: string, role: 'admin' | 'member') => {
    return jwt.sign({id, role}, secret, {
        expiresIn: '3h'
    })
}

class AuthService{
    async signup(data: Omit<User, '_id'>): Promise<{user: User, token: string} | 'user exists'>{
        const parsed = signupZod.parse(data)
        const user = await userModel.findOne({email: data.email})
        if(user) return 'user exists'
        const hashedPassword = await argon2.hash(data.password)
        //check email if containes admin word
        const role = data.email.includes('admin') ? 'admin' : 'member'  
        const newUser = await userModel.create({
            ...data,
            password: hashedPassword,
            role: role
        })
        const token = createToken(newUser.id, newUser.role)
        return {user: newUser, token}
    }

    async signin(data: Pick<User, 'email' | 'password'>): Promise<{user: User, token: string} | string>{
        const parsed = signinZod.parse(data)
        const user = await userModel.findOne({email: data.email})
        if(!user) return 'incorrect email'
        const isMatch = await argon2.verify(data.password, user.password)
        if(!isMatch) return 'incorrect password'
        const token = createToken(user.id, user.role)
        return {user, token}
    }
}

export const authService = new AuthService()