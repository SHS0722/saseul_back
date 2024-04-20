import { User } from "src/user/entity/user.entity";

export class SubscriptionDTO {

    user: User;
    subscription_date: string;
    start_date: string;
    end_date: string;
}