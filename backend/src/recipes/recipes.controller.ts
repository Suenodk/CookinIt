import { Controller, Get } from '@nestjs/common';
import { RecipeDto } from 'src/dto/recipeDto';

@Controller('recipes')
export class RecipesController {
  @Get()
  getRecipes(): RecipeDto {
    return { name: 'Food!' };
  }
}
