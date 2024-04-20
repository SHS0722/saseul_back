import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { IP } from "./entity/ip.entity";
import { Repository } from "typeorm";
import { User } from "src/user/entity/user.entity";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { IPDTO } from "./dto/ip.dto";

@CustomRepository(IP)
export class IPRepository extends Repository<IP> {
    async check(user: User, ip: string){
        
        const myip = await this
        .createQueryBuilder('ip') // myEntity는 테이블의 별칭입니다.
        .where('ip.user_id = :user_id', { user_id : user.user_id }) // user 조건 설정
        .andWhere('ip.ip = :ip', { ip }) // ip 조건 설정
        .getOne(); 

        return myip;
    }

    async checkById(user: User, ip_id: number){
        
        const myip = await this
        .createQueryBuilder('ip') // myEntity는 테이블의 별칭입니다.
        .where('ip.user_id = :user_id', { user_id : user.user_id }) // user 조건 설정
        .andWhere('ip.ip_id = :ip_id', { ip_id }) // ip 조건 설정
        .getOne(); 

        return myip;
    }

    async getIP(user: User){
        const myip = await this
        .createQueryBuilder('ip') // myEntity는 테이블의 별칭입니다.
        .where('ip.user_id = :user_id', { user_id : user.user_id }) // user 조건 설정
        .orderBy('ip.ip_id',"DESC")
        .getMany(); 

        return myip;
    }

    async addIP(user: User, ip: string){
        const new_ip = this.create({ user, ip });
        try {
            await this.save(new_ip);
            return new_ip;
        }catch(error){
            console.log(error)
            throw new InternalServerErrorException();
        }
    }

    async deleteIP(user: User, ip_id: number){
        const this_ip = await this.checkById(user,ip_id)
        if(!this_ip){
            throw new NotFoundException()
        }
        await this.delete({ip_id})
        return ip_id;
    }

    async updateIP(ip_id: number, ipDTO: IPDTO,user: User){
        const this_ip = await this.checkById(user,ip_id)
        if(!this_ip){
            throw new NotFoundException()
        }
        await this.update(ip_id,{ip: ipDTO.ip,user});
        return ip_id;
    }
}