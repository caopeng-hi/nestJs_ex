import { InjectRedis } from '@nestjs-modules/ioredis';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, Controller, Get,  Headers, Param, Post, Query, UseInterceptors, Version } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { User } from './user/user.entity';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './user/user.schema';
import { Model } from 'mongoose';
import { UserRepository } from './user/user.repository';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectModel(Cat.name) private readonly catModule: Model<Cat>,
    private readonly userRepository2:UserRepository,
  ) {}

  @Get()
  async getHello(@Query('token' ) token) {
    const res = await this.redis.get('token')
    console.log(res);

    await this.redis.set('token',token ||'caopeng','EX',60)
    
    return 'hello';
  }


  @Post('/my-post')
  @Version('2')
  async postHandel(@Query('page') page: string, @Param('id') id: string,
    @Body() body: any,
    @Headers('x-tenant-id') xTenantId:any
  ): Promise<any> {
    
     const res = await this.userRepository.find()
    return {
      page,
      id,
      body,
      xTenantId
    }
  }
}
