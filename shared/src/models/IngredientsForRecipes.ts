import { Ingredient } from "./Ingredient";

export class IngredientsForRecipes {
  id: string;
  recipeId: string;
  ingredient: Ingredient;
  amount: string;
  unit: string;
}
