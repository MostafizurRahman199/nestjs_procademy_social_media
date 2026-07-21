import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post()
    login(@Body() body: {email:string, userId:string}){
        return this.authService.login(body.email, body.userId);
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto){
        return await this.authService.signup(createUserDto);
    }

}
