import { Request, Response } from "express";
import { userService } from "./user.service";

class UserController {
    async getAll(req: Request, res: Response){
        try{
            const users = await userService.findUsers()
            res.status(200).json({users})
        }catch(error){
            res.status(400).json({error})
        }
    }
    async getById(req: Request, res: Response){
        try{
            const id: string | undefined = req.params.id
            if(!id) return res.status(400).json({message: 'id not found'})
            const user = await userService.getUser(id)
            if(!user) return res.status(400).json({message: 'user not found'})
            res.status(200).json({user})
        }catch(error){
            res.status(400).json({error})
        }
    }
    async addUser(req: Request, res: Response){
        try{
            const data = req.body
            const user = await userService.addUser(data)
            res.status(200).json({user})
        }catch(error){
            res.status(400).json({error})
        }
    }
    async updateUser(req: Request, res: Response){
        try{
            const id = req.params.id
            const user = req.body
            if(!id) return res.status(400).json({message: 'id not found'})
            const updated = await userService.updateUser(id, user)
            if(!updated) return res.status(400).json({message: 'user not found'})
            res.status(200).json({user: updated})
        }catch(error){
            res.status(400).json({error})
        }
    }
    async deleteUser(req: Request, res: Response){
        try{
            const id: string | undefined = req.params.id
            if(!id) return res.status(400).json({message: 'id not found'})
            const deletedUser = await userService.removeUser(id)
            if(!deletedUser) return res.status(400).json({message: 'note not found'})
            res.status(200).json({deletedUser})
        }catch(error){
            res.status(400).json({error})
        }
    } 
}

export const userController = new UserController()