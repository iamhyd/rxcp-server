import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { testDatabase } from '../../../test/test-db';

describe('UsersService', () => {
  let module: TestingModule;
  let service: UsersService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        testDatabase([User], 'cp'),
        TypeOrmModule.forFeature([User], 'cp'),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
