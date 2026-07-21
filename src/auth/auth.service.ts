import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>

    ){}

    isAuthenticated = false;

    login(email: string, userId: string) {
        console.log(this.authConfiguration.sharedSecret);
        return `Login success for ${email} and user id is ${userId}`
    }


    public async signup(createUserDto: CreateUserDto){
       const createdUser = await this.usersService.createUsers(createUserDto);
       return createdUser;
    }
}
