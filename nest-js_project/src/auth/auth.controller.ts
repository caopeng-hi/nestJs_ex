import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {
        
    }
    @Post('/signin')
    signin(@Body() dto: any) {
        
        const {username,oassword } =dto
        return this.authService.signin(username,oassword )
    }

    @Post('/signup')
    signup(@Body() dto: any) {
        const { username, oassword } = dto
        
        if (!username || !oassword) {
            throw new HttpException('用户名或者密码不能为空',400)
        }
        return this.authService.signup(username,oassword )
    }



}
