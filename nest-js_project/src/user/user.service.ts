import { UserRepository } from './user.repository';
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository:UserRepository
    ){}
    find(username: string) {
        //查询数据库
        this.userRepository.getRepository().find({where:username})
    }

    create(dto: any) {
        this.userRepository.getRepository().create(dto)
    }
}