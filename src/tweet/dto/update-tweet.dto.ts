import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateTweetDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}
