import { IntersectionType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';

import { PaginationQueryDto } from '../../common/pagination/dto/pagination-query.dto';

export class TweetFilterDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class GetTweetsQueryDto extends IntersectionType(
  PaginationQueryDto,
  TweetFilterDto,
) {}
