import { Module } from '@nestjs/common';
import { IpController } from './ip.controller';
import { IpService } from './ip.service';
import { TypeOrmExModule } from 'src/core/typeorm-ex.module';
import { UserRepository } from 'src/user/user.repository';
import { IPRepository } from './ip.repository';

@Module({
  imports : [
    TypeOrmExModule.forCustomRepository([UserRepository,IPRepository])
  ],
  controllers: [IpController],
  providers: [IpService]
})
export class IpModule {}
