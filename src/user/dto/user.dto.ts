import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class createUserDto {

  @IsEmail()
  email: string

  @MinLength(8, {
    message: "Пароль должен содержать не менее 8 символов!"
  })
  @IsString()
  password: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  username: string

  @IsOptional()
  description: string;

  @IsOptional()
  firstname: string

  @IsOptional()
  lastname: string

  @IsOptional()
  country: string

  @IsOptional()
  age: number

  @IsOptional()
  street: string

  @IsOptional()
  sex: string
}