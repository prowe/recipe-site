'use client';

import { Recipe } from "@/recipe-schema";

export default function CopyIngredientsButton({ recipe }: { recipe: Recipe }) {
    const doCopy = () => {
        const ingredients: string[] = recipe.ingredients.flatMap(i => {
            if (typeof i === 'string')
            {
                return i;
            }
            return i.ingredients;
        });
        const toCopy = ingredients.join('\n');
        navigator.clipboard.writeText(toCopy);
    }
    return <button type="button" onClick={doCopy}>Copy</button>
}
