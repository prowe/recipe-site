import { getAllRecipePaths, loadRecipe } from "@/recipes-loader";
import styles from "./page.module.css";
import { Recipe } from "@/recipe-schema";
import AddToMenuButton from "./add-to-menu-button";
import Markdown, { Components, UrlTransform } from "react-markdown";
import CopyIngredientsButton from "./copy-ingredients-button";
import Link from "next/link";

type RecipePageParams = {
  filePath: string;
};

export async function generateStaticParams(): Promise<RecipePageParams[]> {
  const filePaths = await getAllRecipePaths();
  return filePaths.map((filePath) => ({ filePath }));
}

const markdownComponents: Components = {
  a: ({href, children}) => href ? <Link href={href}>{children}</Link> : <a>{children}</a>
};

function IngredientEntry({
  ingredient,
}: {
  ingredient: Recipe["ingredients"][0];
}) {
  if (typeof ingredient === "string") {
    return (
      <li>
        <Markdown components={markdownComponents}>{ingredient}</Markdown>
      </li>
    );
  }

  return (
    <li className={styles.ingredientGroup}>
      <h3>{ingredient.title}</h3>
      <ul>
        {ingredient.ingredients.map((ing) => (
          <IngredientEntry ingredient={ing} />
        ))}
      </ul>
    </li>
  );
}

export default async function RecipePage({
  params,
}: {
  params: RecipePageParams;
}) {
  const recipe = await loadRecipe(params.filePath);

  return (
    <main className={styles.main}>
      <h1>{recipe.title}</h1>

      <section className={styles.ingredients}>
        <h2>
          Ingredients <CopyIngredientsButton recipe={recipe} />
        </h2>
        <ul>
          {recipe.ingredients.map((ing, index) => (
            <IngredientEntry key={index} ingredient={ing} />
          ))}
        </ul>
      </section>

      <section className={styles.steps}>
        <h2>Steps</h2>
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>
              <Markdown>{step}</Markdown>
            </li>
          ))}
        </ol>
      </section>

      {Boolean(recipe.notes?.length) && (
        <section className={styles.notes}>
          <h2>Notes</h2>
          <ol>
            {recipe.notes?.map((note, index) => (
              <li key={index}>
                <Markdown>{note}</Markdown>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section>
        {recipe.source && (
          <a href={recipe.source.toString()} target="_blank">
            Source
          </a>
        )}
      </section>
    </main>
  );
}
