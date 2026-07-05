import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { GetUserParamDto } from "./dtos/get-user-param.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }


    @Get('{:isMarried}')
    getUsers(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('name') name?: string,
        @Query('gender') gender?: string,
        @Param() params?: GetUserParamDto
       
    ) {
        return this.usersService.getAllUsers(name, gender, limit, page,params);
    }

    @Get(':id')
    getSingleUser(
        @Param('id', ParseIntPipe) id: number,

    ) {
        console.log(typeof id);
        return this.usersService.getSingleUser(id);
    }

    @Post()
    createUsers(@Body(new ValidationPipe) body: CreateUserDto) {
        const users = { ...body, id: this.usersService.users.length + 1 }
        return this.usersService.createUsers(users);
    }

    @Patch(':id')
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe) body: UpdateUserDto
    ) {
        return this.usersService.updateUser(id, body);
    }

}