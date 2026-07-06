import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    username: string;

    @IsEmail()
    @IsNotEmpty({message:"Email is required"})
    @MaxLength(255,{message:"Email must be at most 255 characters long"})
    email:string;

    @IsString()
    @IsNotEmpty({message:"Password is required"})
    @MaxLength(255,{message:"Password must be at most 255 characters long"})
    @MinLength(6,{message:"Password must be at least 6 characters long"})
    password:string;


    @IsOptional()
    profile:CreateProfileDto | null;
} 