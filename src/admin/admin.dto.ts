import { IsEmail, IsEmpty, IsNotEmpty, IsString, Matches } from 'class-validator';

export class AdminDTO {
    @IsString({ message: "invalid name" })
    @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
    name: string;

    @IsEmail({}, { message: "invalid email" })
    email: string;
    password: string;
    phone: number;
    filenames: string;

}
export class AdminLoginDTO {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}


export class AdminUpdateDTO {
    id: number;
    name: string;
    email: string;
    password: string;
}