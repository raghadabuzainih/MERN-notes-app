import { User } from "./user.entity";
import { userSchema } from "./user.schema";
import mongoose from "mongoose";

export const userModel = mongoose.model<User>("User", userSchema)