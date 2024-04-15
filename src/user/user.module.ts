import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { TypeOrmExModule } from 'src/core/typeorm-ex.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_SCRET_KEY,
      signOptions : {
        expiresIn: 600 * 60,
      }
    }),
    TypeOrmExModule.forCustomRepository([UserRepository])
  ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  exports: [JwtStrategy,PassportModule]
})
export class UserModule {}
