import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LogsModule } from './common/logs_log/logs.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { CacheModule } from '@nestjs/cache-manager';
import { MailModule } from './common/mail.module';


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
    MailModule
  
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
