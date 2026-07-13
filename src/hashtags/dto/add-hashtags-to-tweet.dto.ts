import { IsArray, IsInt, IsNotEmpty, Min } from 'class-validator';

export class AddHashtagsToTweetDto {
  @IsArray()
  @IsInt({ each: true, message: 'Each hashtagId must be an integer' })
  @Min(1, { each: true, message: 'Each hashtagId must be a positive integer' })
  @IsNotEmpty({ message: 'hashtagIds array must not be empty' })
  hashtagIds: number[];
}
