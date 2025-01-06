import { z } from "zod";

export const createUserSchema = z.object({
    full_name: z
        .string()
        .min(1, "Full name is required"),
    email: z
        .string()
        .min(1, "E-Mail is required")
        .email("E-Mail is invalid"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(32, "Password must be less than 32 characters"),
    confirm_password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(32, "Password must be less than 32 characters"),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"]
})