import { Recipe, recipeSchema } from "./recipe-schema";
import fs from "fs/promises";
import { parse } from "yaml";
import path from "path";

const recipesDir = "./recipes";

export async function loadRecipe(relativePath: string): Promise<Recipe> {
  const filePath = path.join(recipesDir, relativePath);
  try {
    const yaml = await fs.readFile(filePath, "utf-8");
    const recipe = {
      ...recipeSchema.parse(parse(yaml)),
      filePath: relativePath,
    };
    return recipe;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error reading recipe file ${filePath}: ${e.message}`, {
        cause: e,
      });
    }
    throw e;
  }
}

export async function getAllRecipePaths(): Promise<string[]> {
  return await fs.readdir(recipesDir);
}

export async function loadAllRecipes(): Promise<Recipe[]> {
  const paths = await getAllRecipePaths();
  return await Promise.all(paths.map(loadRecipe));
}
