import { IsString, IsOptional } from 'class-validator';

export class AddressDto {
  @IsString()
  @IsOptional()
  readonly line1: string;

  @IsString()
  @IsOptional()
  readonly postal_code: string;

  @IsString()
  @IsOptional()
  readonly city: string;

  @IsString()
  @IsOptional()
  readonly state: string;

  @IsString()
  @IsOptional()
  readonly country: string;
}

export class UserDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly address: AddressDto;
}

// export class UserDto {
//   @IsString()
//   @IsOptional()
//   readonly name: string;

//   @IsString()
//   @IsOptional()
//   readonly email: string;

//   @IsString()
//   @IsOptional()
  // readonly shippping: ShipppingDto;
// }
