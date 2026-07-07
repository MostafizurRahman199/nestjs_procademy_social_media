import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>)
    {}
    



    public async getAllUsers( ) {
        const users = await this.userRepository.find({
          relations:{
            profile:true  
          }
        });
        return users;
    }






    public async getSingleUser(id: number,) {
      const user = await this.userRepository.findOne({
        where: {id}
      });

      if(!user){
        throw new BadRequestException('User not found');
      }
      return user;
    }







    public async getUserByEmail(email: string) {
      const user = await this.userRepository.findOne({
        where: { email }
      });

      if(!user){
        throw new BadRequestException('User not found');
      }
      return user;
    }






    public async createUsers(userDto: CreateUserDto) {
        // validate user does already exits by email or username
        const existingUser = await this.userRepository.findOne({
            where: [
                { email: userDto.email },
                { username: userDto.username }
            ],
        });

        // handle error
        if (existingUser) {
            throw new BadRequestException('User with this email or username already exists');
        }

        // if not create user and meaningfull reply
        // Using cascade: true on the User entity allows us to create the profile simultaneously
        const newUser = this.userRepository.create({
            ...userDto,
            profile: userDto.profile || {}
        });
        await this.userRepository.save(newUser);
        
        return {
            message: 'User created successfully',
            user: newUser,
        };
    }






    updateUser(id: number, updateUserDto: UpdateUserDto) {
        
    }




    

    deleteUser(id:number){
       
    }


}