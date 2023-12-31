import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findOne(username: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  }
}
