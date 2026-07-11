import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty({ message: 'Tweet content is required' })
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}