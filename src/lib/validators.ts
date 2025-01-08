import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  role: z.string(),
  wardId: z.string()
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

export type LoginFormData = z.infer<typeof LoginSchema>;


export const wardSchema = z.object({
  id: z.string().optional(),
  name: z.string()
})

export type wardData = z.infer<typeof wardSchema>