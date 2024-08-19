import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post("register")
  @HttpCode(200)
  async register(@Body() dto: RegistrationDto) {
    return this.authService.register(dto)
  }

  
  @UsePipes(new ValidationPipe())
  @Post("login")
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  
  @UsePipes(new ValidationPipe())
  @Post("login/access-token")
  @HttpCode(200)
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto.refreshToken)
  }
}
