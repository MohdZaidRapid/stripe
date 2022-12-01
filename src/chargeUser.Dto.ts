import { IsString, IsOptional } from 'class-validator';

export class ChargeUserDto {
  @IsString()
  @IsOptional()
  readonly amount: number;

  @IsString()
  @IsOptional()
  readonly paymnetMethodId: string;

  @IsString()
  @IsOptional()
  readonly customerId: string;
}
