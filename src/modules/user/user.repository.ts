import { userModel } from "./user.model";
import { User } from "./user.entity";
import { GenericRepository } from "../../shared/repository";

class UserRepository extends GenericRepository<User>{
    constructor(){
        super(userModel)
    }
    async isEmailExists(email: string): Promise<boolean>{
        const existingUser = await userModel.findOne({email: email})
        if(existingUser) return true
        return false
    }
}

export const userRepo = new UserRepository()