import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { Subscription } from "./entity/subscription.entity";
import { Repository } from "typeorm";

@CustomRepository(Subscription)
export class SubscriptionRepository extends Repository<Subscription> {
    getAllByEmail(user_email: string){

    }

    getOneByEmail(user_id: number){
        const query = this.createQueryBuilder('subscription')
                        .where('subscription.user_id = :user_id',{user_id})
                        .orderBy('subscription.subscription_id',"DESC");

        return query.getOne();
    }
}