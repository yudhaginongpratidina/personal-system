import { z } from "zod";

export const createProjectSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required"),
    description: z
        .string()
        .min(1, "Description is required"),
    techstack: z
        .string()
        .min(1, "Techstack is required"),
    link_repository: z
        .string()
        .min(1, "Repository is required"),
})