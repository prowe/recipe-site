import styles from "./page.module.css";
import RecipeList from "./recipes/RecipeList";

export default async function Home() {
  return (
    <main className={styles.main}>
      <h1>Recipes</h1>
      <RecipeList />
    </main>
  );
}
