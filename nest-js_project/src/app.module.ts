import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LogsModule } from './common/logs_log/logs.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { CacheModule } from '@nestjs/cache-manager';
import { MailModule } from './common/mail.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './user/user.schema';


@Module({
  imports: [ConfigModule, LogsModule,
    RedisModule.forRoot({
    type: 'single',
    url: 'redis://localhost:6379',
    options: {
      password:'example'
    }
    }),
    CacheModule.register({
      ttl: 20, // ms
      isGlobal:true
    }),
    MailModule,
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (configService:ConfigService) => ({
        type: configService.get('DB_TYPE'),
        host: configService.get('DB_HOST'),
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [],
        synchronize: true,
        
      }) as TypeOrmModuleOptions,
    }),
    TypeOrmModule.forFeature([User]),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([{name:Cat.name, schema:CatSchema}])
  
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
