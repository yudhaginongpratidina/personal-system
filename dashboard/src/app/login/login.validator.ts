import { z } from "zod";

export const loginFormSchema = z.object({
    email: z
        .string()
        .min(1, "E-Mail is required")
        .email("E-Mail is invalid"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(32, "Password must be less than 32 characters")
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>;