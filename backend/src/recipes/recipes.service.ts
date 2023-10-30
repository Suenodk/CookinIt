import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Recipe } from '@prisma/client';
import { CreateRecipeDto, UpdateRecipeDto } from '@suenodk/shared';
import { ANONYMOUS_USER_ID } from 'src/users/constants';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async getPublicRecipes(): Promise<Recipe[]> {
    return await this.prisma.recipe.findMany({
      where: {
        public: true,
      },
      include: {
        createdBy: true,
        ingredients: true,
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
        ingredients: true,
        recipeSteps: true,
      },
    });
  }

  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    if (!createRecipeDto.createdById) {
      if (!ANONYMOUS_USER_ID) {
        throw new UnauthorizedException();
      }

      createRecipeDto.createdById = ANONYMOUS_USER_ID;
    }

    return await this.prisma.recipe.create({
      data: {
        title: createRecipeDto.title,
        createdById: createRecipeDto.createdById,
        thumbnailUrl:
          'https://storagetstmc.blob.core.windows.net/thumbnails/recipeThumbnail.jpg',
      },
    });
  }

  async updateRecipe(id: string, recipe: UpdateRecipeDto): Promise<Recipe> {
    await this.prisma.recipe.update({
      where: {
        id: id,
      },
      data: {
        title: recipe.title,
        public: recipe.public,
        thumbnailUrl: recipe.thumbnailUrl,
      },
    });

    await this.prisma.ingredient.deleteMany({
      where: {
        recipeId: id,
      },
    });

    await this.prisma.ingredient.createMany({
      data: [...recipe.ingredients.map((i) => ({ ...i, recipeId: id }))],
    });

    await this.prisma.recipeStep.deleteMany({
      where: {
        recipeId: id,
      },
    });

    await this.prisma.recipeStep.createMany({
      data: [...recipe.recipeSteps.map((i) => ({ ...i, recipeId: id }))],
    });

    return await this.getRecipe(id);
  }
}
