import { UserRole } from "@prisma/client";
import { IsBoolean, IsEmail, IsEnum, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

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

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  username: string

  @IsString()
  @IsOptional()
  firstname: string

  @IsString()
  @IsOptional()
  lastname: string

  @IsString()
  @IsOptional()
  backgroundPath: string

  @IsString()
  @IsOptional()
  phone: string

  @IsString()
  @IsOptional()
  country: string

  @IsString()
  @IsOptional()
  city: string

  @IsString()
  @IsOptional()
  street: string

  @IsString()
  @IsOptional()
  sex: string

  @IsNumber()
  @IsOptional()
  age: number

  @IsNumber()
  @IsOptional()
  avatarPath: string
  

  @IsBoolean()
  @IsOptional()
  isEmailValid: boolean

  @MinLength(8, {
    message: "Пароль должен содержать не менее 8 символов!"
  })
  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole
}