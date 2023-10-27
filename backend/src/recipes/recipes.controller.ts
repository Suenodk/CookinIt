import { Controller, Get, Param } from '@nestjs/common';
import { Recipe } from '@prisma/client';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private recipeService: RecipesService) {}
  @Get()
  async getRecipes(): Promise<Recipe[]> {
    const recipes = await this.recipeService.getRecipes();
    return recipes;
  }

  @Get(':id')
  async getRecipe(@Param() params: any): Promise<Recipe> {
    const recipe = await this.recipeService.getRecipe(params.id);
    return recipe;
  }
}
