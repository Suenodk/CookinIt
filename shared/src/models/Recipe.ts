import { IngredientsForRecipes } from "./IngredientsForRecipes";
import { RecipeStep } from "./RecipeStep";
import { User } from "./User";

export class Recipe {
  id: string;
  title: string;
  thumbnailUrl: string;
  createdAt: Date;
  createdBy: User;
  ingredientsForRecipes: IngredientsForRecipes[];
  recipeStep: RecipeStep[];
}
