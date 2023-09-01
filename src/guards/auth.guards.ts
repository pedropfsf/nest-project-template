import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { useAuth } from '../utils/auth';
import { AuthService } from '../auth/auth.service';

const { getToken } = useAuth();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const token = getToken(request);

      const passed = await this.authService.checkToken(token);

      return passed;
    } catch (error) {
      throw new UnauthorizedException(
        'Você não tem autorização para continuar',
      );
    }
  }
}
