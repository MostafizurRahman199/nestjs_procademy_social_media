import { CreateUserDto } from './dtos/create-user.dto';

export class UsersService{
    
    users : {
        name:string;
        age:number;
        gender:string;
        isMarried:boolean;
        id:number;
        email:string;

    }[]= [
        {name:'mostafiz',age:24,gender:'male',isMarried:false,id:1, email:'[EMAIL_ADDRESS]'},
        {name:'fahim',age:23,gender:'male',isMarried:false,id:2,email:'[EMAIL_ADDRESS]'},
        {name:'rakib',age:24,gender:'male',isMarried:true,id:3,email:'[EMAIL_ADDRESS]'},
        {name:'anik',age:22,gender:'male',isMarried:false,id:4,email:'[EMAIL_ADDRESS]'},
        {name:'arafat',age:21,gender:'male',isMarried:true,id:5,email:'[EMAIL_ADDRESS]'}
    ]

    getAllUsers(name?: string, gender?: string, limit?: number, page?: number) {
        let filteredUsers = this.users.filter(user => 
            (!name || user.name === name) && 
            (!gender || user.gender === gender)
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