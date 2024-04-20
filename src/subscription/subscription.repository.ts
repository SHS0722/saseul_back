import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { Subscription } from "./entity/subscription.entity";
import { Repository } from "typeorm";
import { User } from "src/user/entity/user.entity";
import { SubscriptionDTO } from "./dto/subscription.dto";
import { InternalServerErrorException } from "@nestjs/common";
import { GetUserQuery } from "src/user/dto/get_users.dto";

@CustomRepository(Subscription)
export class SubscriptionRepository extends Repository<Subscription> {
    async getAllById(user_id: number){
        const myip = await this
        .createQueryBuilder('subscription') // myEntity는 테이블의 별칭입니다.
        .where('subscription.user_id = :user_id', { user_id : user_id }) // user 조건 설정
        .orderBy('subscription.subscription_id',"DESC")
        .getMany(); 

        return myip;
    }

    async getOneByEmail(user_id: number){
        const query = this.createQueryBuilder('subscription')
                        .where('subscription.user_id = :user_id',{user_id})
                        .orderBy('subscription.subscription_id',"DESC");

        return await query.getOne();
    }

    async addSub(subscriptionDTO: SubscriptionDTO){
        const new_sub = this.create(subscriptionDTO);
        try {
            await this.save(new_sub);
            return new_sub;
        }catch(error){
            console.log(error)
            throw new InternalServerErrorException();
        }
    }

    async deleteSub(subscription_id: number){
        await this.delete({subscription_id})
        return subscription_id;
    }

    async updateSub(subscriptionDTO: SubscriptionDTO,subscription_id: number){
        const { user, start_date, end_date, subscription_date} = subscriptionDTO;
        await this.update(subscription_id,{ user, start_date, end_date, subscription_date});
        return subscription_id;
    }

}