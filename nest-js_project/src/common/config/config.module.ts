import { Module } from '@nestjs/common';
import * as Joi from 'joi'
import {ConfigModule as Config} from '@nestjs/config'
const envFilePath = [`.env.${process.env.NODE_ENV || 'development'}`, '.env']

const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  POST: Joi.number().default(3306),
  DB_HOST:Joi.string().ip()
})

@Module({
    imports: [Config.forRoot({
        isGlobal: true,
        envFilePath,
        validationSchema: schema
      })],
})
export class ConfigModule {}
