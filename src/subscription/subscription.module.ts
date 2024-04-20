import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { TypeOrmExModule } from 'src/core/typeorm-ex.module';
import { UserRepository } from 'src/user/user.repository';
import { SubscriptionRepository } from './subscription.repository';

@Module({
  imports : [
    TypeOrmExModule.forCustomRepository([UserRepository,SubscriptionRepository])
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService]
})
export class SubscriptionModule {}
