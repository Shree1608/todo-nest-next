import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtUserSrategy } from 'src/auth/stretagy/jwt.stretagy';


@Module({
  imports:[ PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory:(config : ConfigService)=>{
      return{
        secret : config.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn:  config.get<string| number>('JWT_EXPIRES'),
      }
      }
  }}),
  TypeOrmModule.forFeature([User]),],
  controllers: [UserController
  ],
  providers: [UserService , JwtUserSrategy ],
  exports:[JwtUserSrategy , PassportModule]


})
export class UserModule {}
