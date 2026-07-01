export class UsersService{
    
    users : {
        name:string;
        age:number;
        gender:string;
        isMarried:boolean;
        id:number;

    }[]= [
        {name:'mostafiz',age:24,gender:'male',isMarried:false,id:1},
        {name:'fahim',age:23,gender:'male',isMarried:false,id:2},
        {name:'rakib',age:24,gender:'male',isMarried:true,id:3},
        {name:'anik',age:22,gender:'male',isMarried:false,id:4},
        {name:'arafat',age:21,gender:'male',isMarried:true,id:5}
    ]

    getAllUsers(name?: string, gender?: string) {
        return this.users.filter(user => 
            (!name || user.name === name) && 
            (!gender || user.gender === gender)
        );
    }

    getSingleUser(id: number,) {
        return this.users.find(user => 
            user.id === id
        );
    }


    createUsers(user:{
        name:string;    
        age:number;
        gender:string;
        isMarried:boolean;
        id:number;

    }){
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