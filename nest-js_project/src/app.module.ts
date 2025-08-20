import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LogsModule } from './common/logs_log/logs.module';


@Module({
  imports:[ConfigModule, LogsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
