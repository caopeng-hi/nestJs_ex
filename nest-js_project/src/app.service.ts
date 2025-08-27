import { Inject, OnApplicationShutdown } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { DataSource } from "typeorm";


export class AppService implements OnApplicationShutdown{

    constructor(
        @Inject(REQUEST) private readonly request: Request,
        @Inject('TYPE_ORM_CONNECTIONS') private readonly connection:Map<string, DataSource>
    ) {
        
    }
    onApplicationShutdown(signal?: string) {
        if (this.connection.size > 0) {
            for (const key in this.connection) {
               this.connection.get(key)?.destroy()
           }
       }
    }

    getDBConfig(): any {
        const headers = this.request.headers

        const tenantId = headers['x-tenant-id']

        if (tenantId === 'mysql1') {
            return 3307
        } else if (tenantId === 'postgresql') {
            return {
                type: 'postgresql',
                port: 5433,
                username: 'root',
                password:'root'
            }
        }   

        return 3306
    }
}