import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class SubscriptionDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;
}

export class CreateSubscriptionProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
