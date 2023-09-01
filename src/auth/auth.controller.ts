import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: LoginUserDTO) {
    const record = await this.usersService.getOneByEmail(email);
    if (!record) {
      throw new NotFoundException('E-mail não encontrado');
    }

    const isPasswordCorrect = await this.authService.verifyPassword(
      password,
      record.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('A senha está incorreta');
    }

    const token = await this.authService.createToken(record);

    return {
      name: record.name,
      token: token,
    };
  }

  @Post('register')
  async register(@Body() body: RegisterUserDTO) {
    try {
      const hash = await bcrypt.hash(body.password, 10);

      this.usersService.create({
        name: body.name,
        email: body.email,
        password: hash,
      });

      return {
        message: 'Usuário criado com sucesso',
      };
    } catch (error) {
      throw new BadRequestException(
        'Problemas ao se cadastrar no sistema, tente novamente mais tarde',
      );
    }
  }
}
