import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(@Inject(forwardRef(()=>UsersService)) private readonly usersService:UsersService){}

    isAuthenticated = false;

    login(email:string, userId:string){
       
        
    }   
    
}
