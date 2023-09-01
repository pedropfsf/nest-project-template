import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guards';
import { ParamId } from '../decorators/param-id.decorator';
import { CreateUserDTO } from './dto/create-user.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    try {
      return this.usersService.getAll();
    } catch (_) {
      throw new BadRequestException(
        'Problemas no servidor, tente novamente mais tarde',
      );
    }
  }

  @Get(':id')
  getOne(@ParamId() id) {
    try {
      return this.usersService.getOne(id);
    } catch (_) {
      throw new BadRequestException(
        'Problemas no servidor, tente novamente mais tarde',
      );
    }
  }

  @Post()
  create(@Body() body: CreateUserDTO) {
    try {
      return this.usersService.create(body);
    } catch (_) {
      throw new BadRequestException(
        'Problemas no servidor, tente novamente mais tarde',
      );
    }
  }

  @Put(':id')
  edit(@Param() params, @Body() body: CreateUserDTO) {
    try {
      return this.usersService.edit({
        id: params.id,
        ...body,
      });
    } catch (_) {
      throw new BadRequestException(
        'Problemas no servidor, tente novamente mais tarde',
      );
    }
  }

  @Delete(':id')
  remove(@Param() params) {
    try {
      return this.usersService.delete(params.id);
    } catch (_) {
      throw new BadRequestException(
        'Problemas no servidor, tente novamente mais tarde',
      );
    }
  }
}
