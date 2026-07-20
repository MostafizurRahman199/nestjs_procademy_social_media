import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { GetUserParamDto } from "./dtos/get-user-param.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { PaginationQueryDto } from "../common/pagination/dto/pagination-query.dto";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }


    @Get()
    getUsers(@Query() query: PaginationQueryDto) {
        return this.usersService.getAllUsers(query);
    }

    @Get(':id')
    getSingleUser(
        @Param('id',ParseIntPipe) id:number
    ) {
        return this.usersService.getSingleUser(id);
    }

    @Get('email/:email')
    getUserByEmail(
        @Param('email') email: string
    ) {
        return this.usersService.getUserByEmail(email);
    }

    @Post()
    createUsers(@Body() user: CreateUserDto) {
        return this.usersService.createUsers(user);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
    
    @Patch()
    updateUser(
    ) {
        
    }

}