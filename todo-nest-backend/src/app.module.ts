import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';

@Module({
  imports: [UserModule ,
    ConfigModule.forRoot({isGlobal : true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username : process.env.DB_USERNAME,
      password : String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      synchronize:true,
      autoLoadEntities:true
    }),
    TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
