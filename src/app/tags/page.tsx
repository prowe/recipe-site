import styles from "./page.module.css";
import TagList from "./TagList";

export default function Tags() {
  return (
    <main className={styles.main}>
      <h2>Tags</h2>
      <TagList />
    </main>
  );
}
