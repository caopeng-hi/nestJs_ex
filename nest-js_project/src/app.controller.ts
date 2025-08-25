import { InjectRedis } from '@nestjs-modules/ioredis';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { User } from './user/user.entity';
import { Repository } from 'typeorm';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    
    @InjectRepository(User) private readonly userRepository:Repository<User>
  ) {}

  @Get()
  async getHello(@Query('token' ) token) {
    const res = await this.redis.get('token')
    console.log(res);

    await this.redis.set('token',token ||'caopeng','EX',60)
    
    return 'hello';
  }
}
