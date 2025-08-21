import { InjectRedis } from '@nestjs-modules/ioredis';
import { Controller, Get, Query } from '@nestjs/common';
import Redis from 'ioredis';

@Controller()
export class AppController {
  constructor(
    @InjectRedis() private readonly redis:Redis
  ) {}

  @Get()
  async getHello(@Query('token' ) token) {
    const res = await this.redis.get('token')
    console.log(res);

    await this.redis.set('token',token ||'caopeng','EX',60)
    
    return 'hello';
  }
}
