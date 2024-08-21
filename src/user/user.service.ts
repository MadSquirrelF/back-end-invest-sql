import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from 'src/auth/dto/auth.dto';
import { returnAdminListUserObject, returnUserProfile } from './userObject/return-user.object';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      select: returnUserProfile
    })
  }

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

  async toggleFavorite(productId: string, userId: string) {
    const user = await this.getById(userId);

    const isExist = user.favorites.some(product => product.id === productId);

    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        favorites: {
          set: isExist? user.favorites.filter(product => product.id === productId) : [...user.favorites, { id: productId }]
        }
      }
    })
  }

    /* Запросы для админа */

    async getAll(searchTerm?: string) {
      if (searchTerm) this.search(searchTerm)

        return this.prisma.user.findMany({
          select: returnAdminListUserObject,
          orderBy: {
            createdAt: 'desc'
          }
        })
    }

    private async search(searchTerm: string) {
      return this.prisma.user.findMany({
        where: {
          OR: [
            { email: { contains: searchTerm, mode: 'insensitive' } },
            { username: { contains: searchTerm,  mode: 'insensitive' } },
          ],
        },
      })
    }

    async update(id: string, dto: UpdateUserDto) {
      return this.prisma.user.update({
        where: {
          id
        },
        data: dto
      })
    }

    async delete(id: string) {
      return this.prisma.user.delete({
        where: {
          id
        }
      })
    }
}
