import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config'
import * as Joi from 'joi'
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      DB_PORT:Joi.number().default(3306)
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
