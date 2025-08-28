import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passsport'
import {JwtModule} from '@netsjs/jwt'
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/auth.strategy';
@Module({
  controllers: [AuthController, PassportModule, JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      
      return {
        secret: configService.get('JWT_SCREAT'),
        signOptions: {
          expiresIn:'1d'
        }
      }
    }
  })],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
