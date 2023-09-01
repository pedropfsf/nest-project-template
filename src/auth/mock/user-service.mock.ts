import { UsersService } from '../../users/users.service';

export const UsersServiceMock = {
  provide: UsersService,
  useValue: {
    create: jest.fn(),
    edit: jest.fn(),
    getAll: jest.fn(),
    getOne: jest.fn(),
    delete: jest.fn(),
    isExists: jest.fn(),
    getOneByEmail: jest.fn(),
  },
};
