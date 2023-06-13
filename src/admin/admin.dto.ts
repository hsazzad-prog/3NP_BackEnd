import {IsEmail, IsEmpty, IsNotEmpty, IsString, Matches} from'class-validator';

export class AdminDTO{
   @IsString({message:"invalid name"})
   @Matches( /^[a-zA-Z]+$/, {message:"enter a proper name"})
    name: string;

    @IsEmail({}, {message:"invalid email"})
    email: string;
    password: string;
}