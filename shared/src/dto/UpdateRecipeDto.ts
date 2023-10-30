import { Ingredient } from "../models/Ingredient";
import { RecipeStep } from "../models/RecipeStep";

export class UpdateRecipeDto {
  title: string;
  thumbnailUrl: string;
  public: boolean;
  ingredients: Ingredient[];
  recipeSteps: RecipeStep[];
}
