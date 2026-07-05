import { IsBoolean, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class GetUserParamDto {
    
    @Transform(({ value }) => value === 'true' || value === true || value === 1 || value === '1')
    @IsBoolean()
    @IsOptional()
    isMarried:boolean;
    
}