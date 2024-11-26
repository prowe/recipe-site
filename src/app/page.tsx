import styles from "./page.module.css";
import RecipeList from "./recipes/RecipeList";
import TagList from "./tags/TagList";

export default async function Home() {
  return (
    <>
      <aside className={styles.tagListWrapper}>
        <h2>Tags</h2>
        <TagList />
      </aside>
      <main className={styles.main}>
        <h1>Recipes</h1>      
        <RecipeList />
      </main>
    </>
  );
}
