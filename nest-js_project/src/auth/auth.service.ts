import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService
    ){}

    signin(username:string,password:string) {
        this.userService.find(username)
    }

    signup(username:string,password:string) {
        this.userService.create({username,password})
    }
}
