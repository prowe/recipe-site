import { getAllRecipePaths, loadRecipe } from "@/recipes-loader";
import styles from './page.module.css';

type RecipePageParams = {
    filePath: string;
}

export async function generateStaticParams(): Promise<RecipePageParams[]> {
    const filePaths = await getAllRecipePaths();
    return filePaths.map(filePath => ({filePath}));
}

export default async function RecipePage({params}: {params: RecipePageParams}) {
    const recipe = await loadRecipe(params.filePath);

    return (
        <main className={styles.main}>
            <h1>{recipe.title}</h1>

            <section className={styles.ingredients}>
                <h2>Ingredients</h2>
                <ul>
                    {recipe.ingredients.map((ing, index) => <li key={index}>{ing}</li>)}
                </ul>
            </section>

            <section className={styles.steps}>
                <h2>Steps</h2>
                <ol>
                    {recipe.steps.map((step, index) => <li key={index}>{step}</li>)}
                </ol>
            </section>
        </main>
    )
}