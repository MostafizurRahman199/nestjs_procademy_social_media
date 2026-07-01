import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }


    @Get()
    getUsers(
        @Query('name') name?: string,
        @Query('gender') gender?: string
    ) {
        return this.usersService.getAllUsers(name, gender);
    }

    @Get(':id')
    getSingleUser(
        @Param('id', ParseIntPipe) id: number,

    ) {
        console.log(typeof id);
        return this.usersService.getSingleUser(id);
    }

    @Post()
    createUsers(@Body() body: any) {
        const users = { ...body, id: this.usersService.users.length + 1 }
        return this.usersService.createUsers(users);
    }

}