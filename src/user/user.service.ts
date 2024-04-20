import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO, LoginDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import DateUtils from 'src/utils/date-util';
import { JwtService } from '@nestjs/jwt';
import { SubscriptionRepository } from 'src/subscription/subscription.repository';
import { User } from './entity/user.entity';
import { GetUserQuery } from './dto/get_users.dto';
import { IPRepository } from 'src/ip/ip.repository';

@Injectable()
export class UserService {

    constructor(
        private userRepository: UserRepository,
        private subscriptionRepository: SubscriptionRepository,
        private jwtService: JwtService,
        private ipRepository: IPRepository
    ){};

    async createUser(createUserDTO: CreateUserDTO){
        const { user_pw, user_email,user_phone } = createUserDTO;

        const get_user_id = await this.userRepository.getUserById(user_email);
        if(get_user_id){
            throw new ConflictException('이미 가입된 아이디 입니다.');
        }

        const get_user_phone = await this.userRepository.getUserByPhone(user_phone);
        if(get_user_phone){
            throw new ConflictException('이미 가입된 전화번호 입니다.');
        }

        const hashedPassword = await bcrypt.hash(user_pw,10);

        createUserDTO.user_pw = hashedPassword;
        createUserDTO.join_date = DateUtils.momentNow();

        await this.userRepository.createUser(createUserDTO);

        // const accessToken = await this.jwtService.sign({ user_email },{
        //     secret: process.env.JWT_SCRET_KEY,
        //     expiresIn: '30d'
        // })

        throw new ConflictException('가입 완료. 결제 대기 중입니다.');
    }

    async login(loginDTO: LoginDTO){
        const { user_email, user_pw, ip } = loginDTO;

        const user = await this.userRepository.getUserById(user_email);

        if(user && await bcrypt.compare(user_pw, user.user_pw)){
            const sub = await this.subscriptionRepository.getOneByEmail(user.user_id);
            if(!sub){
                throw new ConflictException('이번 달 이용 요금을 결제해주세요.');    
            }
            const today = DateUtils.momentDate();
            if(sub.end_date < today){
                throw new ConflictException('이번 달 이용 요금을 결제해주세요.');    
            }
            const ip_check = await this.ipRepository.check(user,ip);
            if(!ip_check){
                throw new ConflictException('접속이 불가능한 IP입니다.');
            }
            const accessToken = await this.jwtService.sign({ user_email },{
                secret: process.env.JWT_SCRET_KEY,
                expiresIn: '30d'
            })
            return accessToken;
        }else{
            throw new ConflictException('로그인에 실패하였습니다.');
        }
    }

    async checkSub(user: User,ip: string){
        const sub = await this.subscriptionRepository.getOneByEmail(user.user_id);
        if(!sub){
            throw new ConflictException('이번 달 이용 요금을 결제해주세요.');    
        }
        const today = DateUtils.momentDate();
        if(sub.end_date < today){
            throw new ConflictException('이번 달 이용 요금을 결제해주세요.');    
        }
        const ip_check = await this.ipRepository.check(user,ip);
        if(!ip_check){
            throw new ConflictException('접속이 불가능한 IP입니다.');
        }
    }

    async getUser(param: GetUserQuery){
        const res: any = await this.userRepository.getUser(param);
        return this.userRepository.getUser(param);
    }

    async getUserById(user_id: number){
        return this.userRepository.getUserByUserId(user_id)
    }
}
