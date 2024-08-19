import { IsString } from "class-validator";

export class RefreshTokenDto {
  @IsString({
    message: "Вы не передали токен или это не строка!"
  })
  refreshToken: string;
}