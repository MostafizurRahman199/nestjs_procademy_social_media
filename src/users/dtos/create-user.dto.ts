import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto { 

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNumber()
    @IsNotEmpty()
    age:number;

    @IsString()
    @IsNotEmpty()
    gender:string;

    @IsBoolean()
    @IsNotEmpty()
    isMarried:boolean;

    @IsEmail()
    @IsNotEmpty()
    email:string;
} 