import { Request, Response } from "express";
import { userService } from "./user.service";
import argon2 from 'argon2'
class UserController {
    async getAll(req: Request, res: Response){
        const users = await userService.findUsers()
        res.status(200).json({users})
    }
    async getById(req: Request, res: Response){  
        const id: string | undefined = req.params.id
        if(!id) return res.status(400).json({message: 'id not found'})
        const user = await userService.getUser(id)
        if(!user) return res.status(400).json({message: 'user not found'})
        res.status(200).json({user})
    }
    async addUser(req: Request, res: Response){
        const data = req.body
        const result = await userService.addUser(data)
        if(result === 'user already exists') return res.status(401).json({message: result})
        result.password = await argon2.hash(result.password)
        res.status(201).json({result})
    }
    async updateUser(req: Request, res: Response){
        const id = req.params.id
        const user = req.body
        if(!id) return res.status(400).json({message: 'id not found'})
        const updated = await userService.updateUser(id, user)
        if(!updated) return res.status(400).json({message: 'user not found'})
        res.status(200).json({user: updated})
    }
    async deleteUser(req: Request, res: Response){
        const id: string | undefined = req.params.id
        if(!id) return res.status(400).json({message: 'id not found'})
        const deletedUser = await userService.removeUser(id)
        if(!deletedUser) return res.status(400).json({message: 'note not found'})
        res.status(200).json({deletedUser})
    } 
}

export const userController = new UserController()