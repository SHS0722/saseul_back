import { Injectable } from '@nestjs/common';
import { IPRepository } from './ip.repository';
import { User } from 'src/user/entity/user.entity';
import { IPDTO } from './dto/ip.dto';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class IpService {
    constructor(
        private ipRepository: IPRepository,
        private userRepository: UserRepository
    ){}

    async addIP(user_id: number, ip: string){
        const user = await this.userRepository.getUserByUserId(user_id);
        return await this.ipRepository.addIP(user,ip);
    }

    async deleteIP(user_id: number, ip_id: number){
        const user = await this.userRepository.getUserByUserId(user_id);
        return await this.ipRepository.deleteIP(user,ip_id);
    }

    async updateIP(ip_id: number, ipDTO: IPDTO){
        const user = await this.userRepository.getUserByUserId(ipDTO.user_id);
        return await this.ipRepository.updateIP(ip_id,ipDTO,user);
    }

    async getMyIP(user_id: number){
        const user = await this.userRepository.getUserByUserId(user_id);
        return await this.ipRepository.getIP(user)
    }
}
