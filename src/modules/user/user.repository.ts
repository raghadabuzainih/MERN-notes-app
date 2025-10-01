import { userModel } from "./user.model";
import { User } from "./user.entity";
import { GenericRepository } from "../../shared/repository";

export const userRepo = new GenericRepository<User>(userModel)