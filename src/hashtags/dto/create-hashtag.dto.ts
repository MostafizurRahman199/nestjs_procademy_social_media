import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateHashtagDto {
  /**
   * Accepts input with or without a leading '#' (e.g. "#nestjs" or "nestjs").
   * The value is normalised to lowercase and stripped of '#' before saving.
   */
  @IsString()
  @IsNotEmpty({ message: 'Hashtag name is required' })
  @MaxLength(100, { message: 'Hashtag name cannot exceed 100 characters' })
  @Matches(/^#?[a-zA-Z0-9_]+$/, {
    message:
      'Hashtag may only contain letters, numbers, and underscores (optional leading #)',
  })
  @Transform(({ value }: { value: string }) =>
    value.replace(/^#/, '').toLowerCase().trim(),
  )
  name: string;
}
