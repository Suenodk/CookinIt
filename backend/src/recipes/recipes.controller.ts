import { Controller, Get } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from '@prisma/client';

@Controller('recipes')
export class RecipesController {
  constructor(private recipeService: RecipesService) {}
  @Get()
  async getRecipes(): Promise<Recipe[]> {
    const recipes = await this.recipeService.getRecipes();
    return recipes;
  }
}
