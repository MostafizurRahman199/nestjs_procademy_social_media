import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { Repository, FindOptionsWhere } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from '../common/pagination/pagination.provider';
import { PaginationQueryDto } from '../common/pagination/dto/pagination-query.dto';
import { PaginatedResult } from '../common/pagination/interfaces/pagination.interface';


@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        private paginationProvider: PaginationProvider
    )
    {}
    



    public async getAllUsers(query: PaginationQueryDto): Promise<PaginatedResult<User>> {
        return this.paginationProvider.paginate<User>(
          this.userRepository,
          query,
          {
            relations: {
              profile: true  
            }
          }
        );
    }


    public async getSingleUser(id: number,) {
      const user = await this.userRepository.findOne({
        where: {id}
      });

      if(!user){
        throw new NotFoundException('User not found');
      }
      return user;
    }



    public async getUserByEmail(email: string) {
      const user = await this.userRepository.findOne({
        where: { email }
      });

      if(!user){
        throw new NotFoundException('User not found');
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



    public async updateUser(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: { profile: true }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Check if email or username is already taken by another user
        if (updateUserDto.email || updateUserDto.username) {
            const conditions: FindOptionsWhere<User>[] = [];
            if (updateUserDto.email) conditions.push({ email: updateUserDto.email });
            if (updateUserDto.username) conditions.push({ username: updateUserDto.username });
            
            const existingUser = await this.userRepository.findOne({
                where: conditions
            });
            
            if (existingUser && existingUser.id !== id) {
                throw new BadRequestException('User with this email or username already exists');
            }
        }

        // Extract profile and merge it separately if it exists
        const { profile, ...restOfUpdate } = updateUserDto;

        if (profile) {
            user.profile = {
                ...user.profile,
                ...profile
            } as any;
        }

        // Merge the rest of the user properties
        Object.assign(user, restOfUpdate);

        await this.userRepository.save(user);

        return {
            message: 'User updated successfully',
            user,
        };
    }



    async deleteUser(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: { profile: true }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.userRepository.remove(user);

        return { message: 'User deleted successfully' };
    }


}