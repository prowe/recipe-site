"use client"
import { Recipe } from "@/recipe-schema";
import { useEffect, useState } from "react";
import { z } from "zod";

const listSchema = z.array(
  z.object({
    name: z.string(),
    filePath: z.string().optional(),
    subItems: z.array(z.string()),
  })
);

type ShoppingList = z.infer<typeof listSchema>;

export default function AddToMenuButton({ recipe }: { recipe: Recipe }) {
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setDisabled(false);
  }, [setDisabled, recipe.filePath]);
  function onAddToMenu() {
    const shoppingListJSON = localStorage.getItem("shopping-list") ?? "[]";
    const list: ShoppingList = listSchema.parse(JSON.parse(shoppingListJSON));
    list.push({
      name: recipe.title,
      filePath: recipe.filePath,
      subItems: recipe.ingredients.flatMap((ing) => {
        if (typeof ing === "string") {
          return ing;
        }
        return ing.ingredients;
      }),
    });
    localStorage.setItem("shopping-list", JSON.stringify(list));
  }

  return (
    <button onClick={onAddToMenu} disabled={disabled} type="button">
      Add to Menu
    </button>
  );
}
