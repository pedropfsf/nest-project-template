import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  create(body: Pick<UserEntity, 'email' | 'name' | 'password'>) {
    try {
      this.usersRepository.insert(body);
      return {
        message: 'Usuário criado com sucesso',
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Error, não foi possível continuar, tente novamente mais tarde',
      );
    }
  }

  edit(body: Pick<UserEntity, 'id' | 'email' | 'name' | 'password'>) {
    return this.usersRepository.update(body.id, body);
  }

  getAll() {
    try {
      return this.usersRepository.find({
        order: {
          name: 'ASC',
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (_) {
      throw new BadRequestException(
        'Error, não foi possível continuar, tente novamente mais tarde',
      );
    }
  }

  getOne(id: string) {
    try {
      return this.usersRepository.findOne({
        where: {
          id,
        },
      });
    } catch (_) {
      throw new BadRequestException(
        'Error, não foi possível continuar, tente novamente mais tarde',
      );
    }
  }

  delete(id: string) {
    try {
      return this.usersRepository.delete({
        id,
      });
    } catch (_) {
      throw new BadRequestException(
        'Error, não foi possível continuar, tente novamente mais tarde',
      );
    }
  }

  getOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }
}
