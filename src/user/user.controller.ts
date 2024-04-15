import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, LoginDTO } from './dto/user.dto';
import UseAuthGuard from './auth-guards/user-auth';
import AuthUser from 'src/core/auth-user.decorator';
import { User } from './entity/user.entity';

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
    login(@Body(ValidationPipe)loginDTO: LoginDTO){
        return this.userService.login(loginDTO);
    }

    @Post('/check')
    @UseAuthGuard()
    check(@AuthUser()user: User){
        return user;
    }
}
