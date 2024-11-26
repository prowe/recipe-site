import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string(),
  source: z.custom<URL | null>((val) => (val ? new URL(val) : null)).optional(),
  ingredients: z.array(
    z.union([
      z.string(),
      z.object({
        title: z.string(),
        ingredients: z.array(z.string()),
      }),
    ])
  ),
  steps: z.array(z.string()),
  notes: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional()
});

export type Recipe = z.infer<typeof recipeSchema> & {
  filePath: string;
};
