import { IngredientsForRecipes } from "./IngredientsForRecipes";
import { RecipeStep } from "./RecipeStep";
import { User } from "./User";

export class Recipe {
  id: string;
  title: string;
  thumbnailUrl: string;
  public: boolean;
  createdAt: Date;
  createdBy: User;
  ingredientsForRecipes: IngredientsForRecipes[];
  recipeSteps: RecipeStep[];
}
