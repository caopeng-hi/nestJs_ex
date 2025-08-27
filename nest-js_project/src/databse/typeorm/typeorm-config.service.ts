import { AppService } from "@/app.service";
import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { REQUEST } from "@nestjs/core";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";


export class TypeormConfigService implements TypeOrmOptionsFactory{
    constructor(@Inject(REQUEST) private readonly request: Request,
        private readonly configService: ConfigService,
        private readonly    appService: AppService
    ) {
           
       }
    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        const headers = this.request.headers

        const tenantId = headers['x-tenant-id']
        let localConfig
        const config = this.appService.getDBConfig()
        const defaultConfig = {
          type: this.configService.get('DB_TYPE'),
          host: this.configService.get('DB_HOST'),
          port: this.configService.get('DB_PORT'),
          username: 'root',
          password: 'root',
          database: 'test',
          entities: [],
          synchronize: true,
        }


       if (tenantId === 'mysql1') {
            localConfig = {
                    port: 3307 
                }
        } else if (tenantId === 'postgresql') {
           localConfig =  {
                type: 'postgresql',
                port: 5433,
                username: 'root',
                password:'root'
            }
        } else {
            localConfig = {
                    port: 3307 
                }
        }   
          const finalConfig = Object.assign(defaultConfig,config,localConfig)
        return finalConfig
    }
    
}