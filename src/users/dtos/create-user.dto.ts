import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto { 

    @IsString()
    @IsNotEmpty()
    @MinLength(2, {message:"First name must be at least 2 characters long"})
    @MaxLength(100,{message:"First name must be at most 100 characters long"})
    firstName:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2, {message:"Last name must be at least 2 characters long"})
    @MaxLength(100,{message:"Last name must be at most 100 characters long"})
    lastName:string;


    @IsString()
    @IsOptional()
    @MaxLength(10,{message:"Gender must be at most 10 characters long"})
    gender:string;

    @IsEmail()
    @IsNotEmpty({message:"Email is required"})
    @MaxLength(255,{message:"Email must be at most 255 characters long"})
    email:string;

    @IsString()
    @IsNotEmpty({message:"Password is required"})
    @MaxLength(255,{message:"Password must be at most 255 characters long"})
    @MinLength(6,{message:"Password must be at least 6 characters long"})
    password:string;
} 