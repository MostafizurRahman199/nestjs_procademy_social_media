import { PartialType } from '@nestjs/mapped-types';
import { CreateHashtagDto } from './create-hashtag.dto';

/**
 * All fields from CreateHashtagDto are optional on update.
 * PartialType also inherits all validation decorators.
 */
export class UpdateHashtagDto extends PartialType(CreateHashtagDto) {}
