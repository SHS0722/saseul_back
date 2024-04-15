import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from 'dotenv';
import { UserRepository } from "./user.repository";
import { User } from "./entity/user.entity";
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){
        super({
            secretOrKey: process.env.JWT_SCRET_KEY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload){
        const { user_email } = payload;
        const user: User = await this.userRepository.findOne({where:{user_email}});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}