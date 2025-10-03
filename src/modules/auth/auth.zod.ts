import z from "zod";
import { userZod } from "../user/user.zod";

export const signupZod = userZod

export const signinZod = z.object({
    email: z.string(),
    password: z.string()
})