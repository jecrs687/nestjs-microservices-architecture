import { z } from 'zod';
export const createUserSchema = z.object({
  email: z.string().min(1).max(255),
  first_name: z.string().min(1).max(255),
  last_name: z.string().min(1).max(255),
  avatar: z.string().min(1).max(255),
});
