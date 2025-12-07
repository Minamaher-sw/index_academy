/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import { CreateUserDto } from "./dtos/user.create.dto";
import { UpdateUserDto } from "./dtos/user.update.dto";
import { UserEntity } from "./user.entity";
import { Menapipe } from "src/pipe/validationpipe";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
    constructor( private readonly userService : UserService) {}

    @Get()
    getUsers():UserEntity[]{
        const users = this.userService.findAll();
        if(users.length === 0) {
            throw new NotFoundException("No users found");
        }
        return users;
    }

    @Get(":id")
    getUserById(@Param("id", Menapipe) id:string ):UserEntity | string {
        const user = this.userService.findById(id);
        if(!user) {
            throw new NotFoundException("User with id : " + id + " not found");
        }
        return user
    }

    @Post()
    @UsePipes(new ValidationPipe({whitelist:true , forbidNonWhitelisted:true ,groups : ["create"]}))
    createUser(@Body() request:CreateUserDto) :UserEntity {
        const newUser :UserEntity = this.userService.create(request);
        return newUser;
    }

    @Patch(":id")
    @UsePipes(new ValidationPipe({whitelist:true , forbidNonWhitelisted:true , groups : ["update"]}))
    updateUser(@Param("id" , new ParseUUIDPipe({errorHttpStatusCode: 404 , exceptionFactory: () => new NotFoundException("UUID IS Not Correct") })) id:string , @Body() userData:UpdateUserDto) : UserEntity | {message:string , statusCode:number , error:string} {
        const user = this.userService.update(id, userData);
        if(!user) {
            return {
                message : "no user found with this id : " + id ,
                statusCode : 404,
                error : "Not Found"
            }
        }
        return user;
    }

    @Delete(":id")
    removeUser(@Param("id", ParseUUIDPipe) id:string) {
        this.userService.remove(id);
        return {
            message : "user with id : " + id + " deleted successfully",
            statusCode : 200,
            error : "OK"
        }
    }
}