import { Test, TestingModule } from '@nestjs/testing';
import { TrialBalanceService } from './trial-balance.service';

describe('TrialBalanceService', () => {
  let service: TrialBalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrialBalanceService],
    }).compile();

    service = module.get<TrialBalanceService>(TrialBalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
