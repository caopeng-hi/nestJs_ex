import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUserDto } from '@/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {
        
    }
    @Post('/signin')
    signin(@Body() dto: SignUserDto) {
        
        const {username,password } =dto
        return this.authService.signin(username,password )
    }

    @Post('/signup')
    signup(@Body() dto: SignUserDto) {
        const { username, password } = dto
        
        if (!username || !password) {
            throw new HttpException('用户名或者密码不能为空',400)
        }
        return this.authService.signup(username,password )
    }



}
