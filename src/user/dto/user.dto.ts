import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDTO {

    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    user_email: string;

    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    user_pw: string;
    
    @MaxLength(11)
    user_phone: string;

    @IsString()
    user_name: string;

    @IsString()
    miner: string;

    join_date: string;


}

export class LoginDTO {
    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    user_email: string;

    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    user_pw: string;

    ip: string;
}