import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { IP } from "./entity/ip.entity";
import { Repository } from "typeorm";
import { User } from "src/user/entity/user.entity";

@CustomRepository(IP)
export class IPRepository extends Repository<IP> {
    async check(user: User, ip: string){
        const myip = await this.findOne({ where : { user , ip} });

        return myip;
    }
}