import { loadAllRecipes } from "@/recipes-loader";
import Link from "next/link";

export async function getTags(): Promise<Set<string>> {
  const recipes = await loadAllRecipes();
  return new Set(recipes.flatMap((r) => r.tags ?? []));
}

export default async function TagList() {
  const tags = [...(await getTags())].toSorted();
  return (
    <ul>
      {tags.map((tag) => (
        <li key={tag}>
          <Link href={`/tags/${encodeURIComponent(tag)}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  );
}
