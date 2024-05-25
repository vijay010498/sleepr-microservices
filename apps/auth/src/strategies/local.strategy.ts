import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // we can give custom name to use inside guards / guards
  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    // whatever returns from here are automatically added to a request object, in this case it's a user object, used in the current user decorator
    try {
      return await this.usersService.verifyUser(email, password);
    } catch (error) {
      throw error;
    }
  }
}
