import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    if (!email || !password) {
      throw new HttpException(
        'Inorrect email or password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new HttpException(
        'Inorrect email or password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return user;
  }
}
