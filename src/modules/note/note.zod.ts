import { z } from 'zod';

export const noteZod = z.object({
  title: z.string().min(2, 'minimum number of characters is 2'),
  content: z.string().min(10, 'minimum number of characters is 10'),
  user_id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId')
})