import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Recipe } from '@prisma/client';
import { CreateRecipeDto, UpdateRecipeDto } from '@suenodk/shared';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private recipeService: RecipesService) {}
  @Get()
  async getRecipes(): Promise<Recipe[]> {
    const recipes = await this.recipeService.getPublicRecipes();
    return recipes;
  }

  @Get(':id')
  async getRecipe(@Param() params: any): Promise<Recipe> {
    const recipe = await this.recipeService.getRecipe(params.id);
    return recipe;
  }

  @Post()
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<Recipe> {
    const recipe = await this.recipeService.createRecipe(createRecipeDto);
    return recipe;
  }

  @Put(':id')
  async updateRecipe(
    @Param() params: any,
    @Body() recipe: UpdateRecipeDto,
  ): Promise<Recipe> {
    const updatedRecipe = await this.recipeService.updateRecipe(
      params.id,
      recipe,
    );
    return updatedRecipe;
  }
}
