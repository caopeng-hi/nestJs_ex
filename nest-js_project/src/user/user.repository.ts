import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";


export class UserRepository {


    constructor(

        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(User, 'test2') private readonly userRepository1: Repository<User>,
        @Inject(REQUEST) private readonly request:Request
    ) { }
    
    getRepository(): any{

        const headers = this.request.headers

        const tenantId = headers['x-tenant-id']

        if (tenantId === 'test1') {
            return this.userRepository
        }
        return this.userRepository1
        
    }

}