import { IngredientsForRecipes } from "@suenodk/shared/dist/models/IngredientsForRecipes";

interface IngredientsProps {
  ingredients: IngredientsForRecipes[];
}

export default function Ingredients({ ingredients }: IngredientsProps) {
  return (
    <>
      <h2 className="hidden">Ingredients</h2>
      <ul className="my-3 mx-4">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id} className="my-4 cursor-pointer gap-2 flex">
            <input className="cursor-pointer accent-orange-600" type="checkbox" />
            <span>
              {ingredient.amount} {ingredient.unit} {ingredient.ingredient.name}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
