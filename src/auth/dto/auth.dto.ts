import { IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsString()
  email: string;

  @MinLength(8, {
    message: "Пароль должен содержать не менее 8 символов!"
  })
  @IsString()
  password: string;
}

export class RegistrationDto {
  @IsString()
  email: string;

  @MinLength(8, {
    message: "Пароль должен содержать не менее 8 символов!"
  })
  @IsString()
  password: string;

  @MinLength(8, {
    message: "Пароль должен содержать не менее 8 символов!"
  })
  @IsString()
  repeatedPassword: string;
}