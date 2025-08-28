import { UserRepository } from './user.repository';
import { Injectable } from "@nestjs/common";
import * as argon2 from 'argon2'
@Injectable()
export class UserService {
    constructor(
        private readonly userRepository:UserRepository
    ){}
    find(username: string) {
        //查询数据库
      return   this.userRepository.getRepository().find({where:username})
    }

   async create(dto: any) {

        const { password } = dto
       const newHashpass = await argon2.hash(password)
       dto = {...dto,password:newHashpass}
        this.userRepository.getRepository().create(dto)
    }
}