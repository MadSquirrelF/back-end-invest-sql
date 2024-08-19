import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        favorites: true
      }
    })
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      },
      include: {
        favorites: true
      }
    })
  }

  async create(dto: LoginDto) {
    const user = {
      email: dto.email,
      password: await hash(dto.password)
    }

    return this.prisma.user.create({
      data: user
    })
  }
}
