import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  role: z.string()
})

export type RegisterFormData = z.infer<typeof registerSchema>