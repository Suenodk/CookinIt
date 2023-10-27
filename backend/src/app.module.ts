import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { RecipesController } from './recipes/recipes.controller';
import { RecipesService } from './recipes/recipes.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, RecipesController],
  providers: [AppService, RecipesService, PrismaService],
})
export class AppModule {}
