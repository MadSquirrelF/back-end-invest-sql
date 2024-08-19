import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { RegistrationDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,
    private userService: UserService,
    private jwt: JwtService
  ) {}

  async register(dto: RegistrationDto) {
    const oldUser = await this.userService.getByEmail(dto.email)

    if (oldUser) throw new BadRequestException("Пользователя не существует!")

    if (dto.password !== dto.repeatedPassword) throw new BadRequestException("Неправильно указан пароль!")

    const user = await this.userService.create(dto)

    const tokens = this.issueTokens(user.id)

    return {
      user,
      ...tokens
    }
  }

  private issueTokens(userId: string) {
    const data = { id: userId }

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h'
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d'
    })

    return { accessToken, refreshToken }
  }


}
