import { User } from "./user.entity";
import { userRepo } from "./user.repository";

class UserService{
    async findUsers(): Promise<User[]>{
        return await userRepo.findAll()
    }
    async getUser(id: string): Promise<User | null>{
        return await userRepo.findById(id)
    }
    async addUser(user: Omit<User, 'id'>){ 
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