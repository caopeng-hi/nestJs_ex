import { UserService } from '@/user/user.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly userService:UserService
  ) {
    
  }
async  canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
  const { user } = context.switchToHttp().getRequest()
    if (user) {
      const findUser = await this.userService.find(user.username)
    }
    return true;
  }
}
