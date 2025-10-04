import z from "zod";

export const userZod = z.object({
    fullName: z.string().min(10, 'minimum number of characters is 10'),
    email: z.string().email('enter valid email'),
    password: z.string().min(8).regex(/[A-Z]/, 'Must contain uppercase'),
    role: z.enum(['admin', 'member'])
})