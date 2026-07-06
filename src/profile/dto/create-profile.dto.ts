import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  lastName: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  gender?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  website?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  location?: string;

  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;
}