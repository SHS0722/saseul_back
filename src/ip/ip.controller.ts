import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IpService } from './ip.service';
import { IPDTO } from './dto/ip.dto';

@Controller('ip')
export class IpController {
    constructor(
        private ipService: IpService
    ){}

    @Post('/')
    addIP(@Body()req :{user_id: number, ip: string}){
        const { user_id, ip } = req;
        return this.ipService.addIP(user_id,ip);
    }

    @Delete('/')
    deleteIP(@Body()req : {user_id: number, ip_id: number}){
        const { user_id, ip_id } = req;
        return this.ipService.deleteIP(user_id,ip_id);
    }

    @Put('/')
    updateIP(@Body()ipDTO: IPDTO, @Body()req :{ip_id: number}){
        const { ip_id } = req;
        return this.ipService.updateIP(ip_id,ipDTO);
    }

    @Get('/:user_id')
    getMyIP(@Param('user_id')user_id: number){
        return this.ipService.getMyIP(user_id)
    }
}
