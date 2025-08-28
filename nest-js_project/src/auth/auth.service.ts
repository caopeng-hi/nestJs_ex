import { UserService } from './../user/user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2';
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

       const isPasswordValid = argon2.verify(user.password,password)
       if (!isPasswordValid) {
           throw new ForbiddenException('用户名或者密码错误')
       }
       const  token = this.jwt.signAsync({
           username:user.username
       })
       return {
           access_token: token,
           username 
       }
    }

  async  signup(username: string, password: string) {
      const user = await this.userService.find(username)
      if (user) {
          throw new ForbiddenException('用户名已经存在')
      }
        this.userService.create({username,password})
    }
}
