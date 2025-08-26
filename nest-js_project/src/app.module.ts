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
import { UserRepository } from './user/user.repository';
import { AppService } from './app.service';


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
      name:'test1',
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
    TypeOrmModule.forRootAsync({
      name:'test2',
      inject:[ConfigService,AppService],
      useFactory: (configService:ConfigService,appService:AppService) => ({
        type: configService.get('DB_TYPE'),
        host: configService.get('DB_HOST'),
        port: appService.getDBPort(),
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [],
        synchronize: true,
        
      }) as TypeOrmModuleOptions,
    }),
    TypeOrmModule.forFeature([User],'test1'),
    TypeOrmModule.forFeature([User],'test2'),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([{name:Cat.name, schema:CatSchema}])
  
  ],
  controllers: [AppController],
  providers: [UserRepository],
})
export class AppModule {}
