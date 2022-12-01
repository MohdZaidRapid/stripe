import { IsString, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly email: string;
}
