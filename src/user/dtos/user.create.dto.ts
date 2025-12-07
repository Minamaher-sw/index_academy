/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsEmail, IsNumber, IsString, Length, Matches, Max, Min } from "class-validator";

const phoneRegex = /^[0-9]{10}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const nameRegex = /^[a-zA-Z\s]+$/;

export class CreateUserDto {
  @IsString({ groups: ["create", "update"] , message: "Name must be a string" })
  @Length(3, 20, { groups: ["create"], message: "Name must be between 3 and 20 characters" })
  @Length(5,30, { groups: ["update"], message: "Name must be between 5 and 30 characters" })
  @Matches(nameRegex, { groups: ["create", "update"], message: "Name can only contain letters and spaces" })
  name: string;

  @IsString({ groups: ["create", "update"]  , message: "Phone number must be a string" })
  @Matches(phoneRegex, { groups: ["create", "update"], message: "Phone number must be 10 digits" })
  phone: string;

  @IsEmail({}, { groups: ["create", "update"] , message: "Email must be a valid email address" })
  email: string;

  @IsString({ groups: ["create"] })
  @Matches(passwordRegex, { groups: ["create"], message: "Password must be at least 8 characters long and contain at least one letter and one number" })
  password: string;

  @IsNumber({}, { groups: ["create", "update"] , message: "Age must be a number" })
  @Min(14, { groups: ["create", "update"], message: "Age must be at least 14" })
  @Max(120, { groups: ["create", "update"], message: "Age must be at most 120" })
  age?: number;
}
