import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post()
    login(@Body() body: {email:string, userId:string}){
        return this.authService.login(body.email, body.userId);
    }

}
