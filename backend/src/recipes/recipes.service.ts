import { Injectable } from '@nestjs/common';
import { Recipe } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async getRecipes(): Promise<Recipe[]> {
    return await this.prisma.recipe.findMany({
      include: {
        createdBy: true,
        ingredientsForRecipes: {
          include: {
            ingredient: true,
          },
        },
        recipeSteps: true,
      },
    });
  }

  async getRecipe(id: string): Promise<Recipe> {
    return await this.prisma.recipe.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        createdBy: true,
        ingredientsForRecipes: {
          include: {
            ingredient: true,
          },
        },
        recipeSteps: true,
      },
    });
  }
}
