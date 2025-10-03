import { User } from "./user.entity";
import { userRepo } from "./user.repository";
import { userZod } from "./user.zod";

class UserService{
    async findUsers(): Promise<User[]>{
        return await userRepo.findAll()
    }
    async getUser(id: string): Promise<User | null>{
        return await userRepo.findById(id)
    }
    //this for admin if want to add new member
    async addUser(user: Omit<User, 'id'>){
        const parsed = userZod.parse(user)
        user.role = 'member'
        return await userRepo.insert(user) 
    }  
    async updateUser(id: string, updating: Partial<User>){ 
        return await userRepo.update(id, updating)
    }
    async removeUser(id: string){ 
        return await userRepo.deleteById(id) 
    }
}

export const userService = new UserService()