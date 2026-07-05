import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamDto } from './dtos/get-user-param.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService{

    constructor(@Inject(forwardRef(()=>AuthService)) private readonly authService:AuthService){}
    
    users : {
        name:string;
        age:number;
        gender:string;
        isMarried:boolean;
        id:number;
        email:string;

    }[]= [
        {name:'mostafiz',age:24,gender:'male',isMarried:false,id:1, email:'mostafiz@gmail.com'},
        {name:'fahim',age:23,gender:'male',isMarried:false,id:2,email:'fahim@gmail.com'},
        {name:'rakib',age:24,gender:'male',isMarried:true,id:3,email:'[EMAIL_ADDRESS]'},
        {name:'anik',age:22,gender:'male',isMarried:false,id:4,email:'[EMAIL_ADDRESS]'},
        {name:'arafat',age:21,gender:'male',isMarried:true,id:5,email:'[EMAIL_ADDRESS]'}
    ]

    getAllUsers(name?: string, gender?: string, limit?: number, page?: number, params?: GetUserParamDto) {

        if(!this.authService.isAuthenticated){
            return 'You are not authenticated';
        }
        
        let filteredUsers = this.users.filter(user => 
            (!name || user.name === name) && 
            (!gender || user.gender === gender) &&
            (params?.isMarried === undefined || user.isMarried === params?.isMarried)
        );

        if (limit && page) {
            const offset = (page - 1) * limit;
            filteredUsers = filteredUsers.slice(offset, offset + limit);
        }
        return filteredUsers;
    }

    getSingleUser(id: number,) {
        return this.users.find(user => 
            user.id === id
        );
    }


    createUsers(user: CreateUserDto & { id: number }){
        this.users.push(user);
        return this.users;
    }

    updateUser(id: number, updateUserDto: UpdateUserDto) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex > -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
            return this.users[userIndex];
        }
        return 'User not found';
    }

    deleteUser(id:number){
        const user = this.users.find(user=> user.id === id);
        if(user){
            this.users = this.users.filter(user=> user.id !== id);
            return this.users;
        }else{
            return 'User not found';
        }
    }


}