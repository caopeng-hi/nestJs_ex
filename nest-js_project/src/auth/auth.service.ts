import { UserService } from './../user/user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwt:JwtService
    ){}

   async signin(username:string,password:string) {
       const user = await this.userService.find(username)
       if (user) {
           throw new ForbiddenException('用户不存在')
       }

       const isPasswordValid = user.password === password
       if (!isPasswordValid) {
           throw new ForbiddenException('用户名或者密码错误')
       }

       return this.jwt.signAsync({
           username:user.username
       })
    }

    signup(username:string,password:string) {
        this.userService.create({username,password})
    }
}
