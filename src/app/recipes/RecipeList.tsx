import { Recipe } from "@/recipe-schema";
import styles from "./RecipeList.module.css";
import { loadAllRecipes } from "@/recipes-loader";
import Link from "next/link";

export function RecipeListItem({
  recipe,
}: {
  recipe: Recipe;
}) {
  return (
    <li>
      <Link href={`/recipes/${encodeURIComponent(recipe.filePath)}/`}>
        {recipe.title}
      </Link>
    </li>
  );
}

export default async function RecipeList() {
  const recipes = await loadAllRecipes();
  const sortedEntries = recipes.toSorted((a, b) =>
    a.title.localeCompare(b.title)
  );
  return (
    <ul className={styles.recipeList}>
      {sortedEntries.map((recipe) => (
        <RecipeListItem
          key={recipe.filePath}
          recipe={recipe}
        />
      ))}
    </ul>
  );
}
