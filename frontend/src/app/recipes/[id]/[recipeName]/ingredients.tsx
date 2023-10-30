import { Ingredient } from "@suenodk/shared";

interface IngredientsProps {
  ingredients: Ingredient[];
}

export default function Ingredients({ ingredients }: IngredientsProps) {
  return (
    <>
      <h2 className="hidden">Ingredients</h2>
      <ul className="my-3 mx-4">
        {ingredients.map((ingredient, index) => (
          <li key={ingredient.id ?? index} className="my-4 cursor-pointer gap-2 flex">
            <input className="cursor-pointer accent-orange-600" type="checkbox" />
            <span>{ingredient.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
