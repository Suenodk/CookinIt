import { Injectable } from '@nestjs/common';
import { RecipeDto } from 'src/dto/RecipeDto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async getRecipes(): Promise<RecipeDto[]> {
    return await this.prisma.recipe.findMany();
  }
}
