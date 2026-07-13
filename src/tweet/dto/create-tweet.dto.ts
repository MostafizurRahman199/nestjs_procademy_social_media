import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty({ message: 'Tweet content is required' })
  @MaxLength(280, { message: 'Tweet content cannot exceed 280 characters' })
  content: string;

  @IsArray()
  @IsUrl({}, { each: true, message: 'Each image must be a valid URL' })
  @IsOptional()
  images?: string[];
}