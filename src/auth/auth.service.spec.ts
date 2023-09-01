import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  test('Validate token creation', () => {
    const result = authService.createToken({
      id: '1',
      name: 'teste',
      email: 'teste@teste.com',
    });

    expect(result).toBeDefined();
  });
});
