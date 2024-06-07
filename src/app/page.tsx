import { Recipe, recipeSchema } from "@/recipe-schema";
import styles from "./page.module.css";
import { loadAllRecipes } from "@/recipes-loader";
import Link from "next/link";

function RecipeListItem({
  filePath,
  recipe,
}: {
  filePath: string;
  recipe: Recipe;
}) {
  return (
    <li key={filePath}>
      <Link href={`./recipes/${encodeURIComponent(filePath)}/`}>
        {recipe.title}
      </Link>
    </li>
  );
}

export default async function Home() {
  const recipes = await loadAllRecipes();
  const sortedEntries = recipes.toSorted((a, b) =>
    a.title.localeCompare(b.title)
  );
  return (
    <main className={styles.main}>
      <h1>Recipes</h1>
      <ul className={styles.recipeList}>
        {sortedEntries.map((recipe) => (
          <RecipeListItem
            key={recipe.filePath}
            filePath={recipe.filePath}
            recipe={recipe}
          />
        ))}
      </ul>
    </main>
  );
}
