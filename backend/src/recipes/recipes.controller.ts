import { Controller, Get } from '@nestjs/common';
import { RecipeDto } from 'src/dto/RecipeDto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private recipeService: RecipesService) {}
  @Get()
  async getRecipes(): Promise<RecipeDto[]> {
    const recipes = await this.recipeService.getRecipes();
    return recipes;
  }
}
