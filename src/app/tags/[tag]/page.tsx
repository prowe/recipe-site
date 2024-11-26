import { RecipeListItem } from "@/app/recipes/RecipeList";
import { Recipe } from "@/recipe-schema";
import { loadAllRecipes } from "@/recipes-loader";
import { getTags } from "../TagList";
import styles from './page.module.css';

type TagPageParams = {
  tag: string;
};

export async function generateStaticParams(): Promise<TagPageParams[]> {
  const tags = await getTags();
  return [...tags].map(encodeURIComponent).map((tag) => ({ tag }));
}

export default async function TagPage({ params }: { params: TagPageParams }) {
  const tag = decodeURIComponent(params.tag);
  const recipes = await loadAllRecipes();
  const tagRecipes = recipes
    .filter((r) => r.tags?.includes(tag))
    .toSorted((a, b) => a.title.localeCompare(b.title));
  return (
    <main className={styles.main}>
      <h1>{tag}</h1>
      <ul className={styles.recipeList}>
        {tagRecipes.map((recipe) => (
          <RecipeListItem recipe={recipe} key={recipe.filePath} />
        ))}
      </ul>
    </main>
  );
}
