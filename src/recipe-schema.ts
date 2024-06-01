import { z } from "zod";

export const recipeSchema = z.object({
    title: z.string(),
    ingredients: z.array(z.string()),
    steps: z.array(z.string()),
});

export type Recipe = z.infer<typeof recipeSchema>;