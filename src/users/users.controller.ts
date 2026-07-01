import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }


    @Get()
    getUsers(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('name') name?: string,
        @Query('gender') gender?: string
    ) {
        return this.usersService.getAllUsers(name, gender, limit, page);
    }

    @Get(':id')
    getSingleUser(
        @Param('id', ParseIntPipe) id: number,

    ) {
        console.log(typeof id);
        return this.usersService.getSingleUser(id);
    }

    @Post()
    createUsers(@Body() body: CreateUserDto) {
        const users = { ...body, id: this.usersService.users.length + 1 }
        return this.usersService.createUsers(users);
    }

}