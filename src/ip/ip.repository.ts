import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { IP } from "./entity/ip.entity";
import { Repository } from "typeorm";
import { User } from "src/user/entity/user.entity";

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
}