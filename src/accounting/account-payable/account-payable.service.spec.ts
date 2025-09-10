import { Test, TestingModule } from '@nestjs/testing';
import { AccountPayableService } from './account-payable.service';

describe('AccountPayableService', () => {
  let service: AccountPayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountPayableService],
    }).compile();

    service = module.get<AccountPayableService>(AccountPayableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
