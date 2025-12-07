/* eslint-disable prettier/prettier */
// we can write bussines logic
export class UserEntity {
    id: string;
    readonly name: string;
    readonly phone: string;
    readonly email: string;
    readonly password: string;
    readonly age?: number;
}