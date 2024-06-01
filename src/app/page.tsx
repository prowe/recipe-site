import { Recipe, recipeSchema } from "@/recipe-schema";
import styles from "./page.module.css";
import { loadAllRecipes } from "@/recipes-loader";
import Link from "next/link";

function RecipeListItem({filePath, recipe}: {filePath: string, recipe: Recipe}) {
  return (
    <li key={filePath}>
      <Link href={`/recipes/${encodeURIComponent(filePath)}`}>{recipe.title}</Link>
    </li>
  );
}

export default async function Home() {
  const recipes = await loadAllRecipes();
  const sortedEntries = Object.entries(recipes)
    .toSorted((a, b) => a[1].title.localeCompare(b[1].title));
  return (
    <main className={styles.main}>
      <h1>Recipes</h1>
      <ul className={styles.recipeList}>
        {sortedEntries.map(([filePath, recipe]) => <RecipeListItem key={filePath} filePath={filePath} recipe={recipe} />)}
      </ul>
    </main>
  );
}
