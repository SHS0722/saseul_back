import { Body, Controller, Get, Ip, Param, Post, Query, Req, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, LoginDTO } from './dto/user.dto';
import UseAuthGuard from './auth-guards/user-auth';
import AuthUser from 'src/core/auth-user.decorator';
import { User } from './entity/user.entity';
import { GetUserQuery } from './dto/get_users.dto';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Post('/')
    createUser(@Body(ValidationPipe)createUserDTO: CreateUserDTO){
        return this.userService.createUser(createUserDTO);
    }

    @Post('/login')
    login(@Body(ValidationPipe)loginDTO: LoginDTO,@Ip()ip: any){
        loginDTO.ip = ip;
        return this.userService.login(loginDTO);
    }

    @Post('/check')
    @UseAuthGuard()
    async check(@AuthUser()user: User,@Ip()ip: any){

        await this.userService.checkSub(user,ip);
        return user;
    }

    @Get('/')
    async getUser(@Query()param: GetUserQuery){
        return this.userService.getUser(param);
    }

    @Get('/:user_id')
    getUserById(@Param('user_id')user_id: number){
        return this.userService.getUserById(user_id);
    }
}
