/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/user.create.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from "uuid";

@Injectable()
export class UserService {
    private readonly users : UserEntity[] = [];

    findAll() {
        return this.users;
    }

    findById(id: string) :UserEntity | null {
        if (!id) return null;
        return this.users.find(user => user.id === id) || null;
    }

    create(user: CreateUserDto) {
        const newUser :UserEntity = { id: uuid(), ...user } as UserEntity;
        this.users.push(newUser);
        return newUser; 
    }
    update(id: string, userData: Partial<CreateUserDto>) : UserEntity | null {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) return null;
        const existingUser = this.users[userIndex];
        const updatedUser = { ...existingUser, ...userData };
        this.users[userIndex] = updatedUser;
        return updatedUser;
    }

    remove(id: string) : boolean {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) return false;
        this.users.splice(userIndex, 1);
        return true;
    }
}