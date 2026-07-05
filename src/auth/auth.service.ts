import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private readonly usersService:UsersService){}

    login(email:string, userId:string){
        const user = this.usersService.getSingleUser(parseInt(userId));
        if(!user){
            return 'Invalid Credentials';
        }
        if(user.email === email){
            return 'My_token';
        }
        else{
            return 'Invalid Credentials';
        }
    }   
    
}
