import z from "zod";
import { userZod } from "../user/user.zod";

export const signupZod = userZod.pick({
    fullName: true,
    email: true,
    password: true
})

export const signinZod = z.object({
    email: z.string(),
    password: z.string()
})