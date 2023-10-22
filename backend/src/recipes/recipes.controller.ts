import { Controller, Get } from '@nestjs/common';
import { RecipeDto } from 'src/dto/RecipeDto';
import { PrismaService } from 'src/prisma.service';

@Controller('recipes')
export class RecipesController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async getRecipes(): Promise<RecipeDto> {
    const recipes = await this.prisma.recipe.findMany();
    console.log(recipes);
    return { name: 'Food!' };
  }
}
