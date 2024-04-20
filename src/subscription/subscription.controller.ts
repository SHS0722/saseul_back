import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionDTO } from './dto/subscription.dto';

@Controller('subscription')
export class SubscriptionController {
    constructor(
        private subscriptionService: SubscriptionService
    ){}

    @Post('/:user_id')
    addSub(@Body()subscriptionDTO :SubscriptionDTO,@Param('user_id')user_id: number){
        return this.subscriptionService.addSub(user_id,subscriptionDTO);
    }

    @Delete('/:subscription_id')
    deleteSub(@Param('subscription_id')subscription_id: number){
        return this.subscriptionService.deleteSub(subscription_id);
    }

    @Put('/')
    updateSub(@Body()subscriptionDTO :SubscriptionDTO,@Body()req: {user_id: number,subscription_id:number }){
        const { user_id, subscription_id } = req;
        return this.subscriptionService.updateSub(subscriptionDTO,subscription_id,user_id);
    }

    @Get('/:user_id')
    getAll(@Param('user_id')user_id: number){
        return this.subscriptionService.getAll(user_id)
    }
}
