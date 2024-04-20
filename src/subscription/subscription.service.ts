import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionDTO } from './dto/subscription.dto';

@Injectable()
export class SubscriptionService {
    constructor(
        private userRepository: UserRepository,
        private subscriptionRepository: SubscriptionRepository
    ){}

    async getAll(user_id: number){
        return await this.subscriptionRepository.getAllById(user_id);
    }

    async addSub(user_id: number, subscriptionDTO: SubscriptionDTO){
        const user = await this.userRepository.getUserByUserId(user_id);
        subscriptionDTO.user = user;
        return this.subscriptionRepository.addSub(subscriptionDTO);
    }

    async deleteSub(subscription_id: number){
        return this.subscriptionRepository.deleteSub(subscription_id);
    }

    async updateSub(subscriptionDTO: SubscriptionDTO, subscription_id: number, user_id: number){
        const user = await this.userRepository.getUserByUserId(user_id);
        subscriptionDTO.user = user;
        return this.subscriptionRepository.updateSub(subscriptionDTO,subscription_id);
    }
}
