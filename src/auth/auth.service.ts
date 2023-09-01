import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private issuer = 'Sengo api';

  async createToken({
    id,
    name,
    email,
  }: Pick<UserEntity, 'id' | 'name' | 'email'>) {
    const payload = {
      name,
      email,
    };

    const options = {
      expiresIn: '7 days',
      subject: String(id),
      issuer: this.issuer,
      audience: 'users',
      secret: process.env['KEY_SECURITY'],
    };

    return await this.jwtService.signAsync(payload, options);
  }

  async checkToken(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: process.env['KEY_SECURITY'],
    });
  }

  async verifyPassword(input: string, database: string) {
    return await bcrypt.compare(input, database);
  }
}
